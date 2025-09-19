import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useContext } from "react";
import { ListingDataContext } from "../Context/ListingContext";


const Listingpage2 = () => {
  const navigate = useNavigate()
  const { category, setCategory } = useContext(ListingDataContext)

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center bg-white relative ">

      <div
        className="w-[50px] h-[50px] text-white bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/listingpage1")}
      >
        <FaArrowLeft className="w-[25px] h-[25px]" />
      </div>

      <div className="w-[220px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute right-[10px] top-[5%] shadow-lg">
        SetUp Your Category
      </div>
      <div className="max-w-[900px] w-[100%] h-[550px] overflow-auto flex items-center justify-center flex-col gap-[40px] ">
        <h1 className="text-[20px] text-black mt-[100px] px-2 mt-20 md:text-[30px] ">Which of these best describe your place?</h1>

        <div className="max-w-[900px] w-[100%] h-[100%] flex flex-wrap items-center justify-center gap-[15px] md:w-[65%] ">

          <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-1 hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "villa" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("villa")}>
            <GiFamilyHouse className="w-[30px] h-[30px] text-black " /><h3>Villa</h3>
          </div>

          <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-1 hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "farmHouse" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("farmHouse")}>
            <FaTreeCity className="w-[30px] h-[30px] text-black " /><h3>Farm House</h3>
          </div>

          <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-1 hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "poolHouse" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("poolHouse")}>
            <MdOutlinePool className="w-[30px] h-[30px] text-black " /><h3>Pool House</h3>
          </div>

          <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-1 hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "rooms" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("rooms")}>
            <MdBedroomParent className="w-[30px] h-[30px] text-black " /><h3>Rooms</h3>
          </div>

          <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-1 hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "flat" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("flat")}>
            <BiBuildingHouse className="w-[30px] h-[30px] text-black " /><h3>Flat</h3>
          </div>

          <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-1 hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "pg" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("pg")}>
            <IoBedOutline className="w-[30px] h-[30px] text-black " /><h3>PG</h3>
          </div>
          <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-1 hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "cabin" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("cabin")}>
            <GiWoodCabin className="w-[30px] h-[30px] text-black " /><h3>Cabin</h3>
          </div>
          <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-1 hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "shops" ? "border-3 border-[#8b8b8b]" : ""}`} onClick={() => setCategory("shops")}>
            <SiHomeassistantcommunitystore className="w-[30px] h-[30px] text-black " /><h3>Shops</h3>
          </div>





        </div>
        <button className="px-[50px] py-[10px] bg-red-600 absolute right-[5%] bottom-[9%] text-white rounded-lg md:px-[100px]" onClick={()=>navigate("/listingpage3")} disabled={!category}>
          Next
        </button>
      </div>
    </div>

  )
}

export default Listingpage2