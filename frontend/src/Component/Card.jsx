import React, { useState } from 'react'
import { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'
import { ListingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { bookingDataContext } from '../Context/BookingContext'
const Card = ({ title, landmark, image1, image2, image3, rent, city, id, ratings, isBooked, host }) => {
  const navigate = useNavigate()
  const { userData } = useContext(userDataContext)
  const { handleViewCard } = useContext(ListingDataContext)
  const [popUp, setPopUp] = useState(false)

  const { cancelBooking } = useContext(bookingDataContext)


  const handleClick = () => {
    if (userData) {
      handleViewCard(id)
    }
    else {
      navigate("/login")

    }
  }


  return (
    <div className='w-[330px] md:mt-0 max-w-[85%] h-[460px] flex items-start justify-center flex-col rounded-lg cursor-pointer relative z-[10]' onClick={() => !isBooked ? handleClick() : null}>

      {isBooked && <div className='text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] '><GiConfirmed className='w-[20px] h-[20px] text-[green]' />Booked</div>}

      {isBooked && host == userData?._id && < div className='text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px] ' onClick={() => setPopUp(true)}><FcCancel className='w-[20px] h-[20px] ' />Cancel Booking</div>}

      {popUp &&
        <div className='w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg '>
          <div className='w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto text-[20px] p-[10px]  '>Booking Cancel !</div>
          <div className='w-[100%] h-[50%] text-[18px] font-semibold flex items-start justify-center gap-[10px] text-[#986b6b] '>Are you sure? <button className='px-[20px] bg-[red] text-white rounded-lg hover:bg-slate-600 '
            onClick={() =>{
            cancelBooking(id);
            setPopUp(false);
            }}>
            Yes</button>
          <button className='bg-[red] rounded-lg px-[20px] text-white hover:bg-slate-600 ' onClick={() => setPopUp(false)}>No</button>
        </div>
        </div>
      }


      <div className='w-[100%] h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex '>
        <img src={image1} alt="" className='w-[100%]' />
        <img src={image2} alt="" className='w-[100%]' />
        <img src={image3} alt="" className='w-[100%]' />
      </div>

      <div className='w-[100%] h-[33%] py-[20px] flex flex-col gap-[2px] '>
        <div className='flex items-center justify-between text-[18px] '>
          <span className='w-[w-80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#2a2a2a] '>IN {landmark.toUpperCase()}, {city.toUpperCase()} </span>
          <span className='flex items-center justify-center gap-[5px]'><FaStar className='text-[#eb6262]' />{ratings}</span>
        </div>

        <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden  text-nowrap'>{title.toUpperCase()}</span>
        <span className='text-[16px] font-semibold text-[#986b6b] '>₹{rent}/day</span>

      </div>


    </div >


  )
}

export default Card