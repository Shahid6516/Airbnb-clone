import { useContext, useEffect, useState } from "react";
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
import { ListingDataContext } from "../Context/ListingContext";
import { toast } from "react-toastify";


const Nav = () => {
  const [showpopup, setshowpopup] = useState(false);
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [cate, setCate] = useState("")
  const { listingData, setListingData, setNewListData, newListData, searchData, handleSearch, handleViewCard } = useContext(ListingDataContext)

  const [input, setInput] = useState("")



  const handleLogout = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/auth/logout",
         { withCredentials: true })


      setUserData(null)
      console.log("Fetched user:", result.data.user);
      console.log("Result for data:", result.data);
      toast.success("user logout Successfully")


      console.log(result)

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")

    }
  }


  const handleClick = (id) => {
    if (userData) {
      handleViewCard(id)
    }
    else {
      navigate("/login")

    }
  }

  const handleCategory = (category) => {
    setCate(category)
    if (category == "trending") {
      setNewListData(listingData)
    }

    else {
      setNewListData(listingData.filter((list) => list.category == category))

    }


  }

  useEffect(() => {
    handleSearch(input)
  }, [input])



  return (
    <div className="fixed top-0 bg-white z-[20]">
      <div className="w-[100vw] min-h-[70px]  border-b-[1px] border-[#dcdcdc] px-[20px] flex items-center justify-between md:px-[40px] ">
        <div>
          <img src={logo} className="w-[250px]" />
        </div>
        <div className="w-[35%] hidden md:block relative">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-3xl"
            placeholder="Any Where | Any Location | Any city " onChange={(e) => setInput(e.target.value)} value={input}
          />
          <button className="absolute p-[8px] bg-[#ff5a5f] rounded-full right-[3%] top-[5px]">
            <FaSearch className="w-[20px] h-[20px] text-white" />
          </button>
        </div>
        <div className="flex items-center gap-[10px] relative">
          <span className="text-[18px] cursor-pointer rounded-[30px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block" onClick={() => navigate("/listingpage1")} >
            List your home
          </span>
          <button
            className="px-[20px] py-[10px] flex justify-center items-center gap-[5px] border-[2px] border-[#dcdcdc] rounded-full hover:shadow-lg"
            onClick={() => setshowpopup((prev) => !prev)}
          >
            <span>
              <GiHamburgerMenu className="w-[20px] h-[20px]" />
            </span>

            {userData ? (
              <span className="w-8 h-8 bg-[#080808] text-white rounded-full flex items-center justify-center font-bold">
                {userData.name?.charAt(0).toUpperCase()}
              </span>
            ) : (
              <CgProfile className="w-5 h-5 text-gray-600" />
            )}



          </button>

          {showpopup && (
            <div className="pop-up w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[2%] md:right-[10%] border-[1px] border-[#aaa9a9] z-10 rounded-lg">
              <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[10px]">
                {!userData && <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer" onClick={() => {
                  navigate("/login");
                  setshowpopup(false);
                }
                } >
                  Login
                </li>}
                {userData && <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer" onClick={() => {
                  handleLogout();
                  setshowpopup(false);
                }
                }>
                  Logout
                </li>}
                <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer" onClick={() => {
                  navigate("/listingpage1");
                  setshowpopup(false);
                }
                }>
                  List your Home
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer" onClick={() => {
                  navigate("/mylisting");
                  setshowpopup(false);
                }}>
                  My Listing
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#e7e7e7] cursor-pointer" onClick={() => {
                  navigate("/mybooking");
                  setshowpopup(false);
                }}>
                  My Booking
                </li>
              </ul>
            </div>
          )}
        </div>

        {searchData?.length > 0 && <div className="w-[100vw] h-[450px] flex flex-col gap-[20px] absolute top-[50%] overflow-auto left-[0] justify-start items-center">
          <div className="max-w-[700px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[1px] border-[#a2a1a1] cursor-pointer ">
            {
              searchData.map((search) => (
                <div className="border-b border-[black] p-[10px] " onClick={() => handleClick(search._id)}>
                  {search.title} in {search.landmark},{search.city}
                </div>

              ))
            }
          </div>
        </div>}

      </div>

      <div className="w-[100%] mt-1.5 flex items-center justify-center">
        <div className="w-[80%] block md:hidden relative">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-3xl"
            placeholder="Any Where | Any Location | Any city " onChange={(e) => setInput(e.target.value)} value={input}
          />
          <button className="absolute p-[8px] bg-[#ff5a5f] rounded-full right-[3%] top-[5px]">
            <FaSearch className="w-[20px] h-[20px] text-white" />
          </button>
        </div>
      </div>

      <div className="w-[100vw] h-[85px] bg-white flex items-center md:justify-center cursor-pointer gap-[40px] overflow-x-auto px-[15px] justify-start">
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "trending" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => { handleCategory("trending"); setCate("") }}>
          <MdOutlineWhatshot className="w-[30px] h-[30px] " />
          <h3>Trending</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "villa" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("villa")} >
          <GiFamilyHouse className="w-[30px] h-[30px] " />
          <h3>Villa</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "farmHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("farmHouse")} >
          <FaTreeCity className="w-[30px] h-[30px] " />
          <h3>Farm House</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "poolHouse" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("poolHouse")}>
          <MdOutlinePool className="w-[30px] h-[30px] " />
          <h3>Pool House</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "rooms" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("rooms")}>
          <MdBedroomParent className="w-[30px] h-[30px] " />
          <h3>Rooms</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "flat" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("flat")}>
          <BiBuildingHouse className="w-[30px] h-[30px] " />
          <h3>Flat</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "pg" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("pg")}>
          <IoBedOutline className="w-[30px] h-[30px] " />
          <h3>PG</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "cabins" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("cabin")}>
          <GiWoodCabin className="w-[30px] h-[30px] " />
          <h3>Cabins</h3>
        </div>


        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "shops" ? "border-b-[1px] border-[#a6a5a5]" : ""}`} onClick={() => handleCategory("shop")} >
          <SiHomeassistantcommunitystore className="w-[30px] h-[30px] " />
          <h3>Shops</h3>
        </div>
      </div>
    </div >
  );
};

export default Nav;






