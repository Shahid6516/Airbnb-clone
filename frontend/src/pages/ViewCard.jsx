import { useContext, useState, } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';


const ViewCard = () => {
  const navigate = useNavigate()
  const { cardDetails } = useContext(ListingDataContext)
  const { userData } = useContext(userDataContext)
  const [updatePopUp, setUpdatePopUp] = useState(false)
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
      navigate("/")

    } catch (error) {
      setUpdating(false)

      console.log(error)
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
        {cardDetails.host != userData._id && <button className="px-[30px]  py-[10px] bg-red-600  right-[5%] bottom-[9%] text-white rounded-lg md:px-[50px]" >
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

          <button className="px-[50px] py-[10px] bg-red-600 text-white rounded-lg md:px-[100px]" onClick={handleUpdateListing} disabled={updating}>
            {updating ? "Updating..." : "Update Listing"}
          </button>

        </form>


      </div>}

    </div >

  )
}

export default ViewCard