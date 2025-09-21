import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext'


const ViewCard = () => {
  const navigate = useNavigate()
  const { cardDetails } = useContext(ListingDataContext)
  const { userData } = useContext(userDataContext)
  return (
    <div className='w-[100%] h-[140vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative '>
      <div
        className="w-[50px]  h-[50px] text-white bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[25px] h-[25px]" />
      </div>

      <div className='w-[95%] md:mt-8 flex items-start justify-start text-[25px] md:w-[80%] mb-[10px] '>
        <h1 className='text-[20px] text-[#272727] md:text-[30px] 
        text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]  '>{`IN ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}</h1>
      </div>

      <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row '>
        <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white bg-red-600 '>
          <img src={cardDetails.image1} alt="" className='w-[100%] h-[100%]' />
        </div>

        <div className='w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col bg-zinc-900 '>
          <div className='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white '>
            <img src={cardDetails.image2} alt="" className='w-[100%] h-[100%]' />
          </div>

          <div className='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white '>
            <img src={cardDetails.image3} alt="" className='w-[100%] h-[100%]' />
          </div>
        </div>
      </div>



      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">{`${cardDetails.title.toUpperCase()} , ${cardDetails.category.toUpperCase()} , ${cardDetails.landmark.toUpperCase()}`}</div>

      <div className="w-[95%] text-gray-800 flex items-start justify-start text-[18px] md:w-[80%] md:text-[20px] ">{cardDetails.description.toUpperCase()}</div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">{`RS. ${cardDetails.rent} /Day`}</div>

      <div className='w-[100%] h-[50px] flex items-start justify-start px-[10px] md:px-[120px] gap-8'>
        {cardDetails.host == userData._id && < button className="px-[30px]  py-[10px] bg-red-600  right-[5%] bottom-[9%] text-white rounded-lg md:px-[50px] text-nowrap" >
          Edit Listing
        </button>}
        {cardDetails.host != userData._id && <button className="px-[30px]  py-[10px] bg-red-600  right-[5%] bottom-[9%] text-white rounded-lg md:px-[50px]" >
          Booking
        </button>}


      </div>


    </div >

  )
}

export default ViewCard