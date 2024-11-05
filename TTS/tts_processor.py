from confluent_kafka import Producer
import boto3
import json
import joblib
import os
import torch
import torchaudio
from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts

os.environ["CUDA_VISIBLE_DEVICES"] = "1"

s3_client = boto3.client("s3")
bucket_name = "checkitout-bucket"

producer_conf = {
    'bootstrap.servers': 'localhost:9092'
}
producer = Producer(producer_conf)

def process_tts(request_data):
    pages = request_data['pages']
    model_path = request_data['model_path']
    tts_id = request_data['tts_id']
    book_id = request_data['book_id']

    # 경로 설정
    CONFIG_PATH = model_path +"config.json"  # config.json 파일 경로
    CHECKPOINT_PATH = os.path.join(model_path, "best_model.pth")  # 가장 최신 또는 최종 학습된 체크포인트 파일

    REFERENCE_AUDIO_PATH = "/home/j-k11d105/ijoa/app/dataset/wavs/audio2.wav"  # 화자 참조 오디오 파일 경로
    VOCAB_PATH ="/home/j-k11d105/ijoa/app/run/training/XTTS_v2.0_original_model_files/vocab.json"


    config = XttsConfig()
    config.load_json(CONFIG_PATH)  # config.json 파일 로드
    model = Xtts.init_from_config(config)  # 설정을 사용해 모델 초기화
    model.load_checkpoint(config, checkpoint_path=CHECKPOINT_PATH, vocab_path=VOCAB_PATH, use_deepspeed=False)  # 학습된 체크포인트 로드
    model.cuda()

    # 화자 임베딩 및 조건 생성
    print("Computing speaker latents...")
    gpt_cond_latent, speaker_embedding = model.get_conditioning_latents(audio_path=[REFERENCE_AUDIO_PATH])

    s3_keys =[]

    for page in pages:
        page_id = page['pageId']
        text = page['text']
        # 텍스트를 음성으로 변환
        print(f"Inference{page_id}")
        out = model.inference(
            text=text,
            language="ko",  # 사용할 언어 설정
            gpt_cond_latent=gpt_cond_latent,
            speaker_embedding=speaker_embedding,
            temperature=0.7  # 사용자 설정 파라미터
        )
        
        # 결과 저장
        audio_buffer = BytesIO()
        torchaudio.save(OUTPUT_PATH, torch.tensor(out["wav"]).unsqueeze(0), 24000)
        audio_buffer.seek(0) 

        # S3 업로드
        s3_key = f"audio/{tts_id}/{book_id}/xtts_output_{page_id}.wav"
        s3_client.upload_fileobj(audio_buffer, bucket_name, s3_key)
        s3_keys.append({"pageId": page_id, "s3_key": s3_key})

    # S3 경로를 Kafka로 전송
    result_message = {
        "tts_id": tts_id,
        "book_id": book_id,
        "s3_keys": s3_keys
    }
    producer.produce("tts_save_audio", json.dumps(result_message))
    producer.flush()
