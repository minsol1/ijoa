import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TbPencilMinus } from "react-icons/tb";
import back from "/assets/back.png";

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({ isOpen, onClose }) => {
  const [email] = useState<string>("email@email.com"); // 예시 이메일
  const [nickname, setNickname] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  }, [newPassword, confirmPassword]);

  // 회원정보 수정 로직
  const handleComplete = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "오류",
        text: "비밀번호가 일치하지 않습니다.",
        confirmButtonText: "확인",
      });
      return;
    }

    try {
      // 서버로 정보 업데이트 요청(**api 수정 필요)
      await axios.post("/api/update-user", {
        email,
        nickname,
        newPassword,
      });
      Swal.fire({
        icon: "success",
        title: "완료되었습니다",
        text: "정보가 성공적으로 변경되었습니다.",
        confirmButtonText: "확인",
      }).then(() => {
        onClose();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: "정보 변경에 실패했습니다. 다시 시도해 주세요.",
        confirmButtonText: "확인",
      });
      console.error("정보 변경 오류:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/3 pt-20 pb-10 bg-white rounded-lg p-6">
        <button className="absolute w-[50px] top-4 right-4 text-red-500" onClick={onClose}>
          <img src={back} alt="뒤로가기" />
        </button>
        <h1 className="text-center text-gray-700 text-2xl font-bold mb-8">회원정보 변경</h1>
        {/* 이메일 안에는 본인 이메일 들어가도록 나중에 수정하기 */}
        <div className="flex justify-center items-center mb-6 h-10 gap-5">
          <label className="text-gray-700 font-semibold w-24">이메일</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-60 h-[50px] px-6 border rounded-full bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-center mb-2 items-center h-10 gap-5">
            <label className="text-gray-700 font-semibold w-24">닉네임</label>
            <div className="relative w-60">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임"
                className="w-60 h-[50px] px-6 border rounded-full bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
              />
              <TbPencilMinus className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>
          <p className="ml-16 text-[#FF8067] text-sm">* 2~10자 한글 또는 영어</p>
        </div>

        <div className="flex justify-center items-center mb-6 h-10 gap-5">
          <div className="text-gray-700 whitespace-pre-line font-semibold w-24">{"새로운 \n 비밀번호"}</div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-60 h-[50px] px-6 border rounded-full bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex justify-center items-center mb-4 h-10 gap-5">
          <div className="text-gray-700 whitespace-pre-line font-semibold w-24">{"비밀번호 \n 확인"}</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-60 h-[50px] px-6 border rounded-full bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {errorMessage && <div className="text-red-500 font-semibold mb-2 mt-2">{errorMessage}</div>}
        <div className="flex justify-center mt-8">
          <button
            className="w-1/2 h-[60px] py-3 mb-4 font-bold text-xl text-white bg-[#67CCFF] rounded-full hover:bg-blue-50"
            onClick={handleComplete}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
