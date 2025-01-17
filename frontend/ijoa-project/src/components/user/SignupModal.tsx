import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { userApi } from "../../api/userApi";
import Lottie from "react-lottie-player";
import loadingAnimation from "../../lottie/airplane-loadingAnimation.json";

interface Props {
  onClose: () => void;
}

const guideText = ["인증번호를 생성하고 있어요", "이메일을 전송하고 있어요", "거의 다 됐어요"];

const SignupModal: React.FC<Props> = ({ onClose }) => {
  const inputStyle =
    "w-full h-[50px] mb-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-300 text-gray-500 placeholder-gray-400 focus:outline-none";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailError, setEmailError] = useState("");

  const [nicknameError, setNicknameError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guideIdx, setGuideIdx] = useState(0);

  const isFormValid =
    email && password && confirmPassword && nickname && !emailError && !confirmPasswordError && isVerified;

  // 유효한 이메일인지 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|co\.kr)$/i;
    return emailRegex.test(email);
  };

  // 이메일 검사 및 오류 내용 반환
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError("");

    if (newEmail && validateEmail(newEmail)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
      setEmailError("이메일 형식을 지켜주세요!");
    }
  };

  // 이메일 중복 검사 함수
  const checkEmail = async (e: string) => {
    try {
      const response = await userApi.checkEmailDuplication(e);

      // 이메일 사용 가능할 경우
      if (response.status === 202) {
        Swal.fire({
          icon: "error",
          title: "이 이메일은 이미 사용 중입니다!",
        });
      }

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "사용 가능한 이메일 입니다!",
        });
        return true; // 이메일 중복이 없는 경우 true 반환
      }
    } catch (error) {
      console.log("이메일 중복 검사 오류: ", error);
      Swal.fire({
        icon: "error",
        title: "이메일 중복",
        text: "이 이메일은 이미 사용 중입니다.",
      });
      return false;
    }
  };

  const handleEmailVerification = async () => {
    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "유효하지 않은 이메일 형식",
        text: "올바른 이메일 형식을 입력해주세요.",
      });
      return; // 이메일 형식이 유효하지 않으면 함수 종료
    }

    setIsLoading(true);

    // 이메일 중복 검사
    const isEmailAvailable = await checkEmail(email);
    if (!isEmailAvailable) {
      setIsLoading(false); // 이메일 중복인 경우 로딩 종료
      return;
    }

    // API 호출
    try {
      const response = await userApi.sendVerificationCode(email);
      // 이메일 인증 성공 시(201)
      console.log(response);
      if (response.status === 201) {
        setIsVerificationRequested(true);
      }
    } catch (error) {
      console.log("userApi의 sendVerificationCode : ", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 인증 코드 확인 api 통신 함수
  const handleVerificationCodeConfirm = async () => {
    // request 객체 선언
    const data = {
      email: email,
      authCode: verificationCode,
    };
    //api함수 호출
    try {
      const response = await userApi.confirmVerificationCode(data);
      // 인증코드 성공 시(200)
      console.log(response);
      if (response.status === 200) {
        setIsVerified(true);
        Swal.fire("인증 성공", "인증이 완료되었습니다.", "success");
      }
    } catch (error) {
      console.log("userApi의 VerificationCodeConfirm : ", error);
      Swal.fire("인증 실패", "인증 번호가 잘못되었습니다. 다시 확인해 주세요.", "error");
    }
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

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호 입력 및 유효성 검사
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");

    if (newPassword && !validatePassword(newPassword)) {
      setPasswordError("최소 8자 이상, 영문 및 숫자를 포함");
    } else {
      setPasswordError(""); // 유효할 경우 에러 메시지 초기화
    }
  };

  // 닉네임 설정
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(e.target.value);
    // 닉네임 유효성 검사
    if (newNickname.length < 2 || newNickname.length > 10) {
      setNicknameError("닉네임은 2~10자 이내로 설정해야 합니다.");
    } else {
      setNicknameError(""); // 유효한 닉네임일 경우 오류 초기화
    }
  };
  // 회원가입 api 통신 함수
  const handleSubmit = async () => {
    // 입력 필드 유효성 검사
    if (!email || !password || !confirmPassword || !nickname) {
      setGeneralError("필수 정보란을 다 입력해주세요!");
    } else if (!validateEmail(email)) {
      setEmailError("이메일 형식을 지켜주세요!");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다!");
    } else {
      setGeneralError("");

      // 회원가입 요청 데이터 객체 생성
      const data = {
        email: email,
        password: password,
        nickname: nickname,
      };

      // API 호출
      try {
        const response = await userApi.signup(data);

        // 회원가입 성공 시(201)
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "회원가입이 완료되었습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            onClose();
          });
        }
      } catch (error) {
        console.log("userApi의 signup : ", error);
        Swal.fire("회원가입 실패", "회원가입에 실패했습니다. 다시 시도해주세요.", "error");
      }
    }
  };
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setGuideIdx((prev) => (prev + 1) % guideText.length);
      }, 2000);

      // 컴포넌트 언마운트 시 인터벌 정리
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
        <div className="relative w-1/4 py-10 text-center bg-white rounded-2xl shadow-lg">
          <Lottie className="w-40 aspect-1 mx-auto" loop play animationData={loadingAnimation} />
          <p className="font-semibold mt-5">{guideText[guideIdx]}</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="px-5 pt-10">
      <input
        type="email"
        placeholder="이메일을 입력해주세요"
        className={inputStyle}
        value={email}
        onChange={handleEmail}
        disabled={isVerified}
      />
      {emailError && <p className="text-red-500 text-xs md:text-sm mb-4">* {emailError}</p>}

      {!isVerificationRequested ? (
        <button
          className={`w-full h-[50px] mb-2 py-2 rounded-xl font-bold bg-[#FFE0C1] ${
            !isEmailValid || isLoading ? "bg-orange-200 opacity-70" : "active:bg-red-200"
          }`}
          onClick={handleEmailVerification}
          disabled={!isEmailValid || isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            "이메일 인증요청"
          )}
        </button>
      ) : (
        <div className=" w-full mb-2 grid lg:grid-cols-[4fr_1fr_1fr] sm:grid-cols-1 gap-2">
          <input
            type="text"
            placeholder="인증번호 입력"
            className="w-full h-[50px] px-4 rounded-full bg-gray-100 border border-gray-300 text-gray-500 placeholder-gray-400 focus:outline-none"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={isVerified}
          />
          <button
            className={`w-full h-[50px] rounded-xl font-bold ${
              isVerified ? "bg-gray-400 text-white" : "bg-[#FFC890] active:bg-red-200"
            }`}
            onClick={handleVerificationCodeConfirm}
            disabled={isVerified}
          >
            {isVerified ? "완료" : "확인"}
          </button>
          <button
            className={`w-full h-[50px] rounded-xl font-bold ${
              isVerified ? "bg-gray-400 text-white" : "bg-blue-200 active:bg-blue-300"
            }`}
            onClick={handleEmailVerification}
            disabled={isLoading || isVerified}
          >
            재전송
          </button>
        </div>
      )}

      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        className={inputStyle}
        value={password}
        onChange={handlePassword}
      />
      {passwordError && <p className="text-red-500 text-xs md:text-sm mb-4">* {passwordError}</p>}

      <input
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        className={inputStyle}
        value={confirmPassword}
        onChange={handleConfirmPassword}
      />
      {confirmPasswordError && <p className="text-red-500 text-xs md:text-sm mb-4">* {confirmPasswordError}</p>}

      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        className={inputStyle}
        value={nickname}
        onChange={handleNickname}
      />
      {nicknameError && <p className="text-red-500 text-xs md:text-sm mb-4">* {nicknameError}</p>}
      {generalError && <p className="text-red-500 font-bold text-xs md:text-sm mb-4">* {generalError}</p>}

      <button
        onClick={handleSubmit}
        className={`w-full h-[50px] py-2 mb-4 rounded-full font-bold text-base md:text-lg lg:text-xl ${
          isFormValid ? "bg-orange-400 active:bg-orange-500" : "bg-orange-200 opacity-70"
        }`}
        disabled={!isFormValid}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignupModal;
