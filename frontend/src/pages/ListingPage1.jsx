import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ListingPage1 = () => {
    const navigate = useNavigate();

    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center bg-white relative ">
            <form
                action=""
                className="max-w-[900px] w-full md:w-[90%]  h-[500px] flex items-center justify-start flex-col md:items-start gap-[10px] mt-[50px] overflow-auto"
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
             hover:file:bg-blue-100"required /></div>
                </div>

                <div className="w-[90%] mt-7 h-[40px]  flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="img-2" className="text-[20px]">
                        Image2
                    </label>
                    <div className="flex items-center justify-start w-[90%] border-[#555656] border-1 rounded-[10px] "><input type="file" id="img-2" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-black-50 file:text-black
             hover:file:bg-blue-100" required /></div>
                </div>

                <div className="w-[90%] mt-7  flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="img-3" className="text-[20px]">
                        Image3
                    </label>
                    <div className="flex items-center justify-start w-[90%] border-[#555656] border-1 rounded-[10px] "><input type="file" id="img-3" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-black-50 file:text-black
             hover:file:bg-blue-100" required /></div>
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="rent" className="text-[20px]">
                        Rent
                    </label>
                    <input
                        type="text"
                        id="rent"
                        required
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
