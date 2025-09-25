import { useContext, useState, } from 'react'
import { FaArrowLeft, FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { useEffect } from 'react';
import { bookingDataContext } from '../Context/BookingContext';
import { toast } from 'react-toastify';
// import { FaStar } from "react-icons/fa";


const ViewCard = () => {
  const navigate = useNavigate()
  const { cardDetails } = useContext(ListingDataContext)
  const { userData } = useContext(userDataContext)
  const [updatePopUp, setUpdatePopUp] = useState(false)
  const [bookingPopUp, setBookingPopUp] = useState(false)
  const [title, setTitle] = useState(cardDetails.title)
  const [description, setDescription] = useState(cardDetails.description)
  const [frontendImage1, setFrontendImage1] = useState(null)
  const [frontendImage2, setFrontendImage2] = useState(null)
  const [frontendImage3, setFrontendImage3] = useState(null)
  const [backEndImage1, setBackendImage1] = useState(null)
  const [backEndImage2, setBackendImage2] = useState(null)
  const [backEndImage3, setBackendImage3] = useState(null)
  const [rent, setRent] = useState(cardDetails.rent)
  const [city, setCity] = useState(cardDetails.city)
  const [landmark, setLandMark] = useState(cardDetails.landmark)
  const { getListing } = useContext(ListingDataContext);
  const { serverUrl } = useContext(authDataContext)
  const { updating, setUpdating } = useContext(ListingDataContext)
  const { deleting, setDeleting } = useContext(ListingDataContext)
  const [minDate, setMinDate] = useState("")

  const { checkIn, setCheckIn,
    checkOut, setCheckOut,
    total, setTotal,
    night, setNight, handleBooking, booking } = useContext(bookingDataContext)


  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn)
      const outDate = new Date(checkOut)
      var n = (outDate - inDate) / (24 * 60 * 60 * 1000)

      setNight(n)
    }

    const airBnbCharge = (cardDetails.rent * (7 / 100))
    const tax = (cardDetails.rent * (7 / 100))

    if (n > 0) {
      setTotal((cardDetails.rent * n) + airBnbCharge + tax)
    }
    else {
      setTotal(0)
    }


  }, [checkIn, checkOut, cardDetails, rent, total])


  const handleUpdateListing = async () => {
    setUpdating(true)
    try {
      const formData = new FormData()
      formData.append("title", title)
      if (backEndImage1) { formData.append("image1", backEndImage1) }
      if (backEndImage2) { formData.append("image2", backEndImage2) }
      if (backEndImage3) { formData.append("image3", backEndImage3) }
      formData.append("description", description)
      formData.append("rent", rent)
      formData.append("city", city)
      formData.append("landmark", landmark)

      await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, { withCredentials: true })
      setUpdating(false)

      // Reset form
      setTitle(""); setDescription(""); setFrontendImage1(null)
      setFrontendImage2(null); setFrontendImage3(null)
      setBackendImage1(null); setBackendImage2(null); setBackendImage3(null)
      setRent(""); setCity(""); setLandMark("");


      // Refresh listings after adding
      getListing()
      toast.success("Listing updated")

      navigate("/")

    } catch (error) {
      setUpdating(false)
      toast.error(error.response.data.message)

      console.log(error)
    }
  }

  const handleDeleteListing = async () => {
    setDeleting(true)
    try {
      const result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, { withCredentials: true })
      setDeleting(false)
      toast.success("Listing Deleted")

      navigate("/")
      console.log(result.data)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)

      setDeleting(false)

    }
  }

  const handleImage1 = (e) => {
    const file = e.target.files[0]
    setBackendImage1(file)
  }
  const handleImage2 = (e) => {
    const file = e.target.files[0]
    setBackendImage2(file)
  }
  const handleImage3 = (e) => {
    const file = e.target.files[0]
    setBackendImage3(file)
  }


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setMinDate(today)
  }, [])

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
        {cardDetails.host == userData._id && < button className="px-[30px]  py-[10px] bg-red-600  right-[5%] bottom-[9%] text-white rounded-lg md:px-[50px] text-nowrap" onClick={() => setUpdatePopUp(prev => !prev)}>
          Edit Listing
        </button>}
        {cardDetails.host != userData._id && <button className="px-[30px]  py-[10px] bg-red-600  right-[5%] bottom-[9%] text-white rounded-lg md:px-[50px]" onClick={() => setBookingPopUp(prev => !prev)}>
          Reserve
        </button>}
      </div>

      {/* UPDTAE LISTING PAGE */}

      {updatePopUp && <div className='w-[100%] h-[100%] flex items-center justify-center bg-[#000000c8] absolute top-[0px] z-[100] backdrop-blur-sm '>
        <RxCross2 className='w-[30px]  h-[30px] text-white bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => setUpdatePopUp(false)} />

        <form
          action=""
          className="max-w-[900px] w-full md:w-[90%]  h-[600px] flex items-center justify-start flex-col md:items-center gap-[10px] mt-[50px] overflow-auto bg-[#1c1c1d] p-[20px] text-white rounded-2xl" onSubmit={(e) => { e.preventDefault() }}
        >


          <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute right-[10px] top-[5%] shadow-lg">
            Update Your Details
          </div>

          <div className="w-[90%] flex items-start justify-start mt-5  flex-col gap-[10px]">
            <label htmlFor="title" className="text-[20px]">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="_bhk house or best tile"
              required
              onChange={(e) => setTitle(e.target.value)} value={title}
              className="w-[90%] h-[40px] border border-[#555656]  rounded-lg px-[20px] text-[18px]"
            />
          </div>

          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
            <label htmlFor="description" className="text-[20px]">
              Description
            </label>
            <textarea
              name=""
              id="description"
              required
              className="w-[90%] h-[80px] border border-[#555656]  rounded-lg px-[20px] text-[18px]"
              onChange={(e) => setDescription(e.target.value)} value={description}

            ></textarea>
          </div>

          <div className="w-[90%]  h-[40px]  flex items-start justify-start flex-col gap-[10px]">
            <label htmlFor="img-1" className="text-[20px]">
              Image1
            </label>
            <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-1 rounded-[10px] "><input type="file" id="img-1" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-black-50 file:text-black
             hover:file:bg-blue-100" onChange={handleImage1} /></div>
          </div>

          <div className="w-[90%] mt-7 h-[40px]  flex items-start justify-start flex-col gap-[10px]">
            <label htmlFor="img-2" className="text-[20px]">
              Image2
            </label>
            <div className="flex items-center justify-start w-[90%] border-[#555656] border-1 rounded-[10px] "><input type="file" id="img-2" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-black-50 file:text-black
             hover:file:bg-blue-100"  onChange={handleImage2} /></div>
          </div>

          <div className="w-[90%] mt-7  flex items-start justify-start flex-col gap-[10px]">
            <label htmlFor="img-3" className="text-[20px]">
              Image3
            </label>
            <div className="flex items-center justify-start w-[90%] border-[#555656] border-1 rounded-[10px] "><input type="file" id="img-3" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-black-50 file:text-black
             hover:file:bg-blue-100"  onChange={handleImage3} /></div>
          </div>

          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
            <label htmlFor="rent" className="text-[20px]">
              Rent
            </label>
            <input
              type="number"
              id="rent"
              placeholder="RS._____/day"
              required
              onChange={(e) => setRent(e.target.value)} value={rent}

              className="w-[90%] h-[40px] border border-[#555656]  rounded-lg px-[20px] text-[18px]"
            />
          </div>
          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
            <label htmlFor="city" className="text-[20px]">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="city,country"
              required
              onChange={(e) => setCity(e.target.value)} value={city}


              className="w-[90%] h-[40px] border border-[#555656]  rounded-lg px-[20px] text-[18px]"
            />
          </div>
          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
            <label htmlFor="landmark" className="text-[20px]">
              Landmark
            </label>
            <input
              type="text"
              id="landmark"
              required
              onChange={(e) => setLandMark(e.target.value)} value={landmark}
              className="w-[90%] h-[40px] border border-[#555656]  rounded-lg px-[20px] text-[18px]"
            />
          </div>
          <div className='w-[100%] md:mr-15 flex items-center justify-center gap-[30px] mt-5'>
            <button className="px-[10px] py-[10px] bg-red-600 text-white rounded-lg md:px-[100px] text-[15px] md:text-[18px] text-nowrap" onClick={handleUpdateListing} disabled={updating}>
              {updating ? "Updating..." : "Update Listing"}
            </button>
            <button className="px-[10px] py-[10px] bg-red-600 text-white rounded-lg md:px-[100px] text-[15px] md:text-[18px] text-nowrap" disabled={deleting} onClick={handleDeleteListing} >
              {deleting ? "Deleting..." : "Delete Listing"}
            </button>
          </div>
        </form>


      </div>}

      {/* ############################################################################## */}

      {bookingPopUp && (
        <div className='w-[100%] h-[100%] flex items-center justify-center flex-col gap-[50px] bg-[#ffffffc0] absolute top-[0px] z-[100] backdrop-blur-sm md:flex-row md:gap-[100px]'>
          <RxCross2
            className='w-[30px]  h-[30px] text-white bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center'
            onClick={() => setBookingPopUp(false)}
          />

          <form
            className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-[#dedddd]'
            onSubmit={(e) => {
              e.preventDefault();
              handleBooking(cardDetails._id);
            }}
          >
            <h1 className='w-[100%] flex items-center justify-center py-[10px] text-[25px] border-b-1 border-[#a3a3a3]'>
              Confirm & Book
            </h1>

            <div className='w-[100%] h-[70%] mt-[10px] rounded-lg p-[10px]'>
              <h3 className='text-[19px] font-semibold'>Your Trip -</h3>

              <div className='flex items-center flex-col gap-[20px] mt-[20px]'>
                {/* Check-in */}
                <div className='w-[80%] flex flex-col md:flex-row gap-[10px] items-center justify-between'>
                  <label htmlFor="checkIn" className="text-[20px] text-nowrap">Check-in</label>
                  <input
                    type="date"
                    id="checkIn"
                    min={minDate}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-[90%] h-[40px] border border-[#555656] rounded-lg px-[10px] bg-transparent md:text-[18px] text-[15px]"
                  />
                </div>

                {/* Check-out */}
                <div className='w-[80%] flex flex-col md:flex-row gap-[10px] items-center justify-between'>
                  <label htmlFor="checkOut" className="text-[20px] text-nowrap">Check-out</label>
                  <input
                    type="date"
                    id="checkOut"
                    min={checkIn || minDate}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-[90%] h-[40px] border border-[#555656] rounded-lg px-[10px] bg-transparent md:text-[18px] text-[15px]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-7 px-[100px] py-[10px] bg-red-600 text-white rounded-lg text-[18px] text-nowrap" disabled={booking}
                >
                  {booking ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          </form>

          {/* Booking summary */}
          <div className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex flex-col gap-[10px] border-[1px] border-[#dedddd]'>
            <div className='w-[95%] h-[30%] border-[1px] border-[#9f9d9d] rounded-lg flex justify-center items-center gap-[10px] p-[20px] overflow-hidden'>
              <div className='w-[70px] h-[90px] md:w-[100px] md:h-[100px] flex items-center justify-center rounded-lg'>
                <img className='w-[100%] h-[100%] rounded-lg' src={cardDetails.image1} alt="" />
              </div>
              <div className='w-[100%] h-[100px] gap-[5px]'>
                <h1 className='w-[90%] truncate'>{`IN ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}</h1>
                <h1>{cardDetails.title.toUpperCase()}</h1>
                <h1>{cardDetails.category.toUpperCase()}</h1>
                <h1 className='flex items-center gap-[5px]'>
                  <FaStar className='text-[#eb6262]' /> {cardDetails.ratings}
                </h1>
              </div>
            </div>

            <div className='w-[95%] h-[60%] border-[1px] border-[#9f9d9d] rounded-lg flex flex-col justify-start p-[20px] gap-[10px]'>
              <h1 className='text-[22px] font-semibold'>Booking Price -</h1>

              <p className='flex justify-between px-[20px]'>
                <span className='font-semibold'>{`₹ ${cardDetails.rent} X ${night} nights`}</span>
                <span>{cardDetails.rent * night}</span>
              </p>

              <p className='flex justify-between px-[20px]'>
                <span className='font-semibold'>Tax</span>
                <span>{Math.floor(cardDetails.rent * night * 0.07)}</span>
              </p>

              <p className='flex justify-between px-[20px] border-b-[1px] border-gray-500 pb-[10px]'>
                <span className='font-semibold'>Airbnb Charge</span>
                <span>{Math.floor(cardDetails.rent * night * 0.07)}</span>
              </p>

              <p className='flex justify-between px-[20px]'>
                <span className='font-semibold'>Total Price</span>
                <span>{total}</span>
              </p>
            </div>
          </div>
        </div>
      )}






    </div >

  )
}

export default ViewCard