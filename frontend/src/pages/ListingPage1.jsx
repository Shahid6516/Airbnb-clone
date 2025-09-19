import { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";

const ListingPage1 = () => {
    const navigate = useNavigate();

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
        category, setCategory, } = useContext(ListingDataContext)

    const handleImage1 = (e) => {
        const file = e.target.files[0]
        setBackendImage1(file)
        setFrontendImage1(URL.createObjectURL(file))
    }
    const handleImage2 = (e) => {
        const file = e.target.files[0]
        setBackendImage2(file)
        setFrontendImage2(URL.createObjectURL(file))
    }
    const handleImage3 = (e) => {
        const file = e.target.files[0]
        setBackendImage3(file)
        setFrontendImage3(URL.createObjectURL(file))
    }

    const handleForm = (e) => {
        e.preventDefault()
        navigate("/listingpage2")
    }

    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center bg-white relative ">
            <form
                action=""
                className="max-w-[900px] w-full md:w-[90%]  h-[500px] flex items-center justify-start flex-col md:items-start gap-[10px] mt-[50px] overflow-auto"
                onSubmit={handleForm}
            >
                <div
                    className="w-[50px] h-[50px] text-white bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
                    onClick={() => navigate("/")}
                >
                    <FaArrowLeft className="w-[25px] h-[25px]" />
                </div>

                <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute right-[10px] top-[5%] shadow-lg">
                    SetUp Your Home
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="title" className="text-[20px]">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
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
                        onChange={(e) => setDescription(e.target.value)} value={description}
                        className="w-[90%] h-[80px] border border-[#555656]  rounded-lg px-[20px] text-[18px]"
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
             hover:file:bg-blue-100"required onChange={handleImage1} /></div>
                </div>

                <div className="w-[90%] mt-7 h-[40px]  flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="img-2" className="text-[20px]">
                        Image2
                    </label>
                    <div className="flex items-center justify-start w-[90%] border-[#555656] border-1 rounded-[10px] "><input type="file" id="img-2" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-black-50 file:text-black
             hover:file:bg-blue-100" required onChange={handleImage2} /></div>
                </div>

                <div className="w-[90%] mt-7  flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="img-3" className="text-[20px]">
                        Image3
                    </label>
                    <div className="flex items-center justify-start w-[90%] border-[#555656] border-1 rounded-[10px] "><input type="file" id="img-3" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-black-50 file:text-black
             hover:file:bg-blue-100" required onChange={handleImage3} /></div>
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="rent" className="text-[20px]">
                        Rent
                    </label>
                    <input
                        type="number"
                        id="rent"
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

                <button className="px-[50px] py-[10px] bg-red-600 text-white rounded-lg md:px-[100px]">
                    Next
                </button>

            </form>
        </div>
    );
};

export default ListingPage1;
