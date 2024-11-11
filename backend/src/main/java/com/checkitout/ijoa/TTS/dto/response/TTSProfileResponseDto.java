package com.checkitout.ijoa.TTS.dto.response;

import com.checkitout.ijoa.TTS.domain.TTS;
import lombok.Builder;
import lombok.Data;

@Data
public class TTSProfileResponseDto {
    private Long id;
    private String name;
    private String tts;
    private String image_url;
    private boolean trainData;

    @Builder
    public TTSProfileResponseDto(Long id, String name, String tts, String image, boolean trainData) {
        this.id = id;
        this.name = name;
        this.tts = tts;
        this.image_url = image;
        this.trainData = trainData;
    }

    public static TTSProfileResponseDto fromTTS(TTS tts, boolean trainData){
        return TTSProfileResponseDto.builder()
                .id(tts.getId())
                .name(tts.getName())
                .tts(tts.getTTS())
                .image(tts.getImage())
                .trainData(trainData)
                .build();
    }
}
