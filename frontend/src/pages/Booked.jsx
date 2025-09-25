import React, { useContext, useState } from 'react';
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from '../Context/BookingContext';
import { useNavigate } from 'react-router-dom';
import Star from '../Component/Star';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { ListingDataContext } from '../Context/ListingContext';

const Booked = () => {
    const { bookingData } = useContext(bookingDataContext);
    const [star, setStar] = useState(null);
    const navigate = useNavigate();

    // ✅ Now serverUrl comes from userDataContext
    const { serverUrl, getCurrentUser } = useContext(userDataContext);
    const { getListing, cardDetails } = useContext(ListingDataContext);

    const handleStar = (value) => {
        setStar(value);
        console.log("You Rated:", value);
    }

    const handleRating = async (id) => {
        if (!serverUrl) {
            console.error("serverUrl is not defined!");
            return;
        }
        if (!id) {
            console.error("Listing ID is missing!");
            return;
        }
        if (!star) {
            console.error("Please select a rating before submitting!");
            return;
        }

        try {
            const requestUrl = `${serverUrl}/api/listing/ratings/${id}`;
            console.log("Sending request to:", requestUrl);

            const result = await axios.post(
                requestUrl,
                { ratings: star },
                { withCredentials: true }
            );

            await getListing();
            await getCurrentUser();
            console.log("Rating submitted:", result.data);

            navigate("/");
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    }

    return (
        <div className='w-[100vw] min-h-[110vh] flex items-center justify-center gap-[20px] bg-slate-200 flex-col'>
            
            <div className='w-[95%] max-w-[450px] h-[330px] bg-white flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <div className='w-[100%] h-[50%] text-[22px] flex items-center justify-center flex-col gap-[20px] font-semibold'>
                    <GiConfirmed className='w-[80px] h-[80px] text-[green]' />
                    Booking Confirmed
                </div>

                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Booking Id :</span> <span className='ml-1'>{bookingData._id}</span>
                </div>

                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Owner Details Id :</span> <span className='ml-1'>{bookingData.host?.email}</span>
                </div>

                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Total Rent :</span> <span className='ml-1'>{bookingData.totalRent}</span>
                </div>
            </div>

            <div className='w-[95%] max-w-[550px] h-[200px] bg-white flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <h1 className='text-[18px]'>{star || 0} out of 5 Rating</h1>
                <Star onRate={handleStar} />
                <button
                    className="px-[50px] py-[10px] bg-red-600 text-white rounded-lg md:px-[50px]"
                    onClick={() => handleRating(cardDetails?._id)}
                    disabled={!star} // ✅ disable until rating selected
                >
                    Submit
                </button>
            </div>

            <button
                className="px-[50px] py-[10px] bg-red-600 text-white rounded-lg md:px-[100px] text-nowrap absolute top-[10px] right-[20px]"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
        </div>
    );
}

export default Booked;
