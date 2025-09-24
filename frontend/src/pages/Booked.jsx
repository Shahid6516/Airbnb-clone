import React, { useContext } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from '../Context/BookingContext';
import { FaStar } from "react-icons/fa";



const Booked = () => {
    const { bookingData } = useContext(bookingDataContext)
    return (
        <div className='w-[100vw] min-h-[110vh] flex items-center justify-center gap-[20px] bg-slate-200 flex-col '>

            <div className='w-[95%] max-w-[450px] h-[330px] bg-white flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg '>

                <div className='w-[100%] h-[50%] text-[22px] flex items-center justify-center flex-col gap-[20px] font-semibold '><GiConfirmed className='w-[80px] h-[80px] text-[green]' />Booking Confirmed</div>

                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px] '>
                    <span>Booking Id :</span> <span className='ml-1'>{bookingData._id} </span>
                </div>

                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px] '>
                    <span>Owner Details Id :</span> <span className='ml-1'>{bookingData.host?.email} </span>
                </div>

                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px] '>
                    <span>Total Rent :</span> <span className='ml-1'>{bookingData.totalRent} </span>
                </div>
            </div>

            <div className='w-[95%] max-w-[550px] h-[200px] bg-white flex items-center justify-center border-[1px]  border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <h1> 0 out of 5 Rating</h1>
                <FaStar />
            </div>


        </div>
    )
}

export default Booked