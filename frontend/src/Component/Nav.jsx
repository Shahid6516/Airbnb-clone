import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext"
import axios from "axios"
import logo from "../assets/logo.png";
import { userDataContext } from "../Context/UserContext";


const Nav = () => {
  const [showpopup, setshowpopup] = useState(false);
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(userDataContext)

  const { serverUrl } = useContext(authDataContext)
  const handleLogout = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/auth/logout", { withCredentials: true })

     
      setUserData(null)
      console.log("Fetched user:", result.data.user);
      console.log("Result for data:", result.data);


      console.log(result)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div className="w-[100vw] min-h-[70px]  border-b-[1px] border-[#dcdcdc] px-[20px] flex items-center justify-between ">
        <div>
          <img src={logo} className="w-[130px]" />
        </div>
        <div className="w-[35%] hidden md:block relative">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-3xl"
            placeholder="Any Where | Any Location | Any city "
          />
          <button className="absolute p-[8px] bg-[#ff5a5f] rounded-full right-[3%] top-[5px]">
            <FaSearch className="w-[20px] h-[20px] text-white" />
          </button>
        </div>
        <div className="flex items-center gap-[10px] relative">
          <span className="text-[18px] cursor-pointer rounded-[30px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block">
            List your home
          </span>
          <button
            className="px-[20px] py-[10px] flex justify-center items-center gap-[5px] border-[2px] border-[#dcdcdc] rounded-full hover:shadow-lg"
            onClick={() => setshowpopup((prev) => !prev)}
          >
            <span>
              <GiHamburgerMenu className="w-[20px] h-[20px]" />
            </span>

            {userData == null && <span>
              <CgProfile className="w-[20px] h-[20px]" />
            </span>}
            {userData != null && <span className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center">{userData?.name?.slice(0, 1)}</span>}
          </button>

          {showpopup && (
            <div className="pop-up w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[2%] md:right-[10%] border-[1px] border-[#aaa9a9] z-10 rounded-lg">
              <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[10px]">
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer" onClick={() => navigate("/login")}>
                  Login
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
                <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer">
                  List your Home
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer">
                  My Listing
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer">
                  Check Booking
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="w-[100%] mt-1.5 flex items-center justify-center">
        <div className="w-[80%] block md:hidden relative">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-3xl"
            placeholder="Any Where | Any Location | Any city "
          />
          <button className="absolute p-[8px] bg-[#ff5a5f] rounded-full right-[3%] top-[5px]">
            <FaSearch className="w-[20px] h-[20px] text-white" />
          </button>
        </div>
      </div>

      <div className="w-[100vw] h-[85px] bg-white flex items-center md:justify-center cursor-pointer gap-[40px] overflow-x-auto px-[15px] justify-start">
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ">
          <MdOutlineWhatshot className="w-[30px] h-[30px] " />
          <h3>Trending</h3>
        </div>
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ">
          <GiFamilyHouse className="w-[30px] h-[30px] " />
          <h3>Villa</h3>
        </div>
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] text-nowrap">
          <FaTreeCity className="w-[30px] h-[30px] " />
          <h3>Farm House</h3>
        </div>
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] text-nowrap ">
          <MdOutlinePool className="w-[30px] h-[30px] " />
          <h3>Pool House</h3>
        </div>
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ">
          <MdBedroomParent className="w-[30px] h-[30px] " />
          <h3>Rooms</h3>
        </div>
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ">
          <BiBuildingHouse className="w-[30px] h-[30px] " />
          <h3>Flat</h3>
        </div>
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ">
          <IoBedOutline className="w-[30px] h-[30px] " />
          <h3>PG</h3>
        </div>
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ">
          <GiWoodCabin className="w-[30px] h-[30px] " />
          <h3>Cabins</h3>
        </div>

        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ">
          <SiHomeassistantcommunitystore className="w-[30px] h-[30px] " />
          <h3>Shops</h3>
        </div>
      </div>
    </div>
  );
};

export default Nav;
