import React, { useState } from "react";
import "../../css/FairytaleContentPage.css";
import { FaCheck } from "react-icons/fa";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative w-1/3 max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4 red-highlight">탈퇴 안내</h2>
        <div className=" whitespace-pre-line font-semibold text-gray-600 mt-4 mb-4">
          {"회원 탈퇴를 진행하기 전 \n 아래 항목을 꼭 확인해 주세요"}.
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mb-4">
            <div className="flex mb-2">
              <span className="text-blue-500 mr-2">
                <FaCheck size={20} />
              </span>
              <p className="font-bold text-gray-800">탈퇴 후 개인정보는 모두 삭제됩니다.</p>
            </div>
            <div className="text-sm ml-7 text-left whitespace-pre-line text-gray-600">
              {"프로필 정보 : 이메일 주소, 이름, 전화번호, \n 비밀번호 정보 삭제"}
            </div>
            <div className="text-sm ml-7 text-left  whitespace-pre-line text-gray-600">
              {"포함된 워크 스페이스 : 회원이 포함되었던 \n 워크스페이스 목록 삭제"}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex mb-2">
              <span className="text-blue-500 mr-2">
                <FaCheck size={20} />
              </span>
              <p className="font-bold text-gray-800">탈퇴 후에도 일부 정보는 남아있습니다.</p>
            </div>
            <p className="text-sm ml-7 text-left text-gray-600">활동내역: 자녀의 답변, 읽은 책 로그</p>
          </div>

          <div className="flex items-center mt-4 mb-6">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-gray-700 font-semibold text-xl">
              안내사항 모두 확인, 동의합니다.
            </label>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 font-semibold bg-gray-300 text-gray-700 rounded-3xl hover:bg-gray-400"
          >
            뒤로가기
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 bg-[#FF8067] font-semibold text-white rounded-3xl hover:bg-red-400 ${
              !isChecked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isChecked}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;