import React, { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  onClose: () => void;
}
const SignupModal: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // 유효한 이메일인지 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 검사 및 오류 내용 반환
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError("");

    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("이메일 형식을 지켜주세요!");
    }
  };

  // 이메일 인증 요청 핸들러
  const handleEmailVerificationRequest = () => {
    setIsVerificationRequested(true);
    // 이메일 인증 코드 발송 API 요청 추가.
  };

  // 인증 코드 확인 핸들러
  const handleVerificationCodeConfirm = () => {
    // 입력한 인증 코드를 확인하는 로직을 추가할 수 있습니다.
    if (verificationCode === "1234") {
      // 예시 코드
      Swal.fire("인증 성공", "이메일 인증이 완료되었습니다.", "success");
      setIsVerified(true);
    } else {
      Swal.fire("인증 실패", "잘못된 인증번호입니다.", "error");
    }
  };

  // 비밀번호 입력
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");
  };

  // 비밀번호 확인 및 불일치 시 오류 반환
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError("");

    if (newConfirmPassword && newConfirmPassword !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다!");
    }
  };

  // 닉네임 설정
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 필수 정보들이 다 입력 안 되어 있을 시 오류 반환, 성공 시 확인메세지 및 메인화면으로 렌더링
  const handleSubmit = () => {
    if (!email || !password || !confirmPassword || !nickname) {
      setGeneralError("필수 정보란을 다 입력해주세요!");
    } else if (!validateEmail(email)) {
      setEmailError("이메일 형식을 지켜주세요!");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다!");
    } else {
      setGeneralError("");
      Swal.fire({
        icon: "success",
        title: "회원가입이 완료되었습니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        onClose();
      });
    }
  };

  return (
    <div className="modal-container">
      <input
        type="email"
        placeholder="* 이메일을 입력해주세요"
        className="w-3/4 mb-1 px-4 py-3 rounded-full bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
        value={email}
        onChange={handleEmail}
      />
      {emailError && <p className="text-red-500 text-sm mb-4">{emailError}</p>}

      {!isVerificationRequested ? (
        <button
          className="w-3/4 mb-4 py-3 rounded-xl font-bold bg-red-100 hover:bg-red-200"
          onClick={handleEmailVerificationRequest}
        >
          이메일 인증요청
        </button>
      ) : (
        <div className="flex items-center w-full justify-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="인증번호를 입력해주세요"
            className="flex-grow max-w-[60%] px-4 py-3 rounded-full bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isVerified} // 인증 완료 시 입력 비활성화
          />
          <button
            className={`px-4 py-3 rounded-full font-bold ${
              isVerified ? "bg-red-300" : "bg-blue-100 hover:bg-blue-200"
            }`}
            onClick={handleVerificationCodeConfirm}
            disabled={isVerified} // 인증 완료 시 버튼 비활성화
          >
            {isVerified ? "완료" : "확인"}
          </button>
        </div>
      )}

      <input
        type="password"
        placeholder="* 비밀번호를 입력해주세요"
        className="w-3/4 mb-1 px-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-gray-500 placeholder-gray-400 focus:outline-none"
        value={password}
        onChange={handlePassword}
      />
      {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}

      <input
        type="password"
        placeholder="* 비밀번호를 다시 입력해주세요"
        className="w-3/4 mb-1 px-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-gray-500 placeholder-gray-400 focus:outline-none"
        value={confirmPassword}
        onChange={handleConfirmPassword}
      />
      {confirmPasswordError && <p className="text-red-500 text-sm mb-4">{confirmPasswordError}</p>}

      <input
        type="text"
        placeholder="* 닉네임을 입력해주세요"
        className="w-3/4 mb-4 px-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-gray-500 placeholder-gray-400 focus:outline-none"
        value={nickname}
        onChange={handleNickname}
      />

      {generalError && <p className="text-red-500 font-bold text-sm mb-4">{generalError}</p>}

      <button
        onClick={handleSubmit}
        className="w-3/4 py-3 mb-4 rounded-full font-bold bg-orange-400 hover:bg-orange-500"
      >
        회원가입
      </button>
    </div>
  );
};

export default SignupModal;
