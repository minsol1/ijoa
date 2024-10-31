import { MdLogout, MdChildCare } from "react-icons/md";
import { PiUserSwitch } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = () => {
  const navigate = useNavigate();

  const handleChangeToParent = () => {
    localStorage.setItem("userType", "parent");
    navigate("/parent/child/list");
  };

  const handleLogout = () => {
    navigate("/home");
  };

  return (
    <div className="dropdown dropdown-end">
      <button className="w-14 flex flex-col justify-center items-center space-y-1">
        <img
          className="w-12 aspect-1 p-2 bg-white rounded-full shadow-[0_3px_3px_1px_rgba(0,0,0,0.1)]"
          src="/assets/profile-img-girl.png"
          alt=""
        />
        <p className="text-sm text-[#B27F44] font-bold">프로필</p>
      </button>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content w-60 p-2 mt-3 bg-base-100 rounded-box border-2 shadow-lg z-[1] grid gap-1">
        <li className="h-14">
          <div className="w-full h-full flex items-center space-x-3 hover:bg-white">
            <MdChildCare className="text-2xl" />
            <p className="text-lg">다솔이 (만 4세)</p>
          </div>
        </li>
        <hr className="h-[0.5px] bg-[#9e9e9e]" />
        <li className="h-14" onClick={handleChangeToParent}>
          <div className="w-full h-full flex items-center space-x-3 hover:bg-[#FFF0CA] rounded-2xl">
            <PiUserSwitch className="text-2xl" />
            <p className="text-lg">부모로 전환</p>
          </div>
        </li>
        <li className="h-14" onClick={handleLogout}>
          <div className="w-full h-full flex items-center space-x-3 hover:bg-[#FFF0CA] rounded-2xl">
            <MdLogout className="text-2xl" />
            <p className="text-lg">로그아웃</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;