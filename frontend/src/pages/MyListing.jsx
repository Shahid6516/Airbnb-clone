import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import Card from "../Component/Card";

const MyListing = () => {
  const navigate = useNavigate();
  const { newListData, getListing } = useContext(ListingDataContext);
  const { userData } = useContext(userDataContext);

  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    // Fetch all listings when component mounts
    getListing();
  }, []);

  useEffect(() => {
    // Filter listings belonging to current user
    if (userData && newListData) {
      const filtered = newListData.filter(
        (list) => list.host === userData._id
      );
      setMyListings(filtered);
    }
  }, [userData, newListData]);

  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative">
      {/* Back button */}
      <div
        className="w-[50px] h-[50px] text-white bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-[25px] h-[25px]" />
      </div>
     <div className="w-[50px] h-[50px] text-white bg-red-600 cursor-pointer absolute md:top-[10%] top-[3%] left-[20px] rounded-[50%] flex items-center justify-center" onClick={() => navigate("/")}><FaArrowLeft className="w-[25px] h-[25px]" />
                 </div>

      {/* Title */}
      <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[20px] md:text-[30px] rounded-md text-[#613b3b] font-semibold md:w-[600px] mt-[50px] text-nowrap">
        My LISTING
      </div>

      {/* Listings */}
      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {myListings.length > 0 ? (
          myListings.map((list) => (
            <Card
              key={list._id}
              title={list.title}
              landmark={list.landmark}
              city={list.city}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
              isBooked={list.isBooked}
              ratings={list.ratings}
              host={list.host}
            />
          ))
        ) : (
          <p className="text-gray-500 text-[18px] mt-10">
            No listings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyListing;
