import { useContext } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../Context/ListingContext';


const ListingPage3 = () => {
  const navigate = useNavigate()
  const { title, setTitle,
    description, setDescription,
    frontendImage1, setFrontendImage1,
    frontendImage2, setFrontendImage2,
    frontendImage3, setFrontendImage3,
    backEndImage1, setBackendImage1,
    backEndImage2, setBackendImage2,
    backEndImage3, setBackendImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandMark,
    category, setCategory,
    handleAddListing,
    adding,setAdding,
  } = useContext(ListingDataContext)
  return (
    <div className='w-[100%] md:h-[140vh] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative '>
      <div
        className="w-[50px]  h-[50px] text-white bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/listingpage2")}
      >
        <FaArrowLeft className="w-[25px] h-[25px]" />
      </div>

      <div className='w-[95%] md:mt-8 flex items-start justify-start text-[25px] md:w-[80%] mb-[10px] '>

        <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]'>{`IN ${landmark.toUpperCase()}, ${city.toUpperCase()}`}</h1>
      </div>

      <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row '>
        <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white bg-red-600 '>
          <img src={frontendImage1} alt="" className='w-[100%] h-[100%]' />
        </div>

        <div className='w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col bg-zinc-900 '>
          <div className='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white '>
            <img src={frontendImage2} alt="" className='w-[100%] h-[100%]' />
          </div>

          <div className='w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white '>
            <img src={frontendImage3} alt="" className='w-[100%] h-[100%]' />
          </div>
        </div>
      </div>



      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">{`${title.toUpperCase()} , ${category.toUpperCase()} , ${landmark.toUpperCase()}`}</div>

      <div className="w-[95%] text-gray-800 flex items-start justify-start text-[18px] md:w-[80%] md:text-[20px] ">{`${description.toUpperCase()}`}</div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">{`RS. ${rent.toUpperCase()} /Day`}</div>

      <div className='w-[100%] h-[50px] flex items-start justify-start px-[10px] md:px-[120px]'>
        <button className="px-[50px]  py-[10px] bg-red-600  right-[5%] bottom-[9%] text-white rounded-lg md:px-[50px]" onClick={handleAddListing} disabled={adding}>
          {adding ? "Adding..." :"Add your list"}
        </button>

      </div>

    </div>
  )
}

export default ListingPage3