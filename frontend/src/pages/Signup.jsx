import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { toast } from 'react-toastify';

const Signup = () => {
    const [show, setshow] = useState("false");
    const navigate = useNavigate();
    // const { serverUrl } = useContext(authDataContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { userData, setUserData } = useContext(userDataContext)
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useContext(authDataContext)
    const { serverUrl, loading, setLoading } = useContext(authDataContext)


    const handleSignUp = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const result = await axios.post(serverUrl + "/api/auth/signup", {
                name,
                email,
                password
            }, { withCredentials: true });
            setLoading(false)

            setUserData(result.data.user)
            navigate("/")
            toast.success("Signup Successfully")
            console.log(result);
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)



            console.log(error);
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] relative flex items-center justify-center">
            <div
                className="w-[50px] h-[50px] text-white bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center "
                onClick={() => navigate("/")}
            >
                <FaArrowLeft className="w-[25px] h-[25px]" />
            </div>
            <form
                action="
            "
                className="max-w-[900px] w-full md:w-[90%]  h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]"
                onSubmit={handleSignUp}
            >
                <h1 className="text-[45px] md:text-5xl text-black">
                    Welcome to Airbnb
                </h1>
                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]">
                    <label htmlFor="" className="text-[20px]">
                        UserName
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        onChange={(e) => setName(e.target.value)}

                        value={name}
                        className="w-[90%] h-[40px] border  border-[#555656] rounded-lg px-[20px] text-[18px] "
                    />
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                    <label htmlFor="" className="text-[20px]">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-[90%] h-[40px] border border-[#555656]  rounded-lg px-[20px] text-[18px]"
                    />
                </div>

                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]  relative">
                    <label htmlFor="" className="text-[20px]">
                        Password
                    </label>
                    <input
                        type={show ? "text" : "password"}
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-[90%] h-[40px] border border-[#555656]  rounded-lg px-[20px] text-[18px] "
                    />
                    {!show && (
                        <MdRemoveRedEye
                            className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
                            onClick={() => setshow((prev) => !prev)}
                        />
                    )}
                    {show && (
                        <IoMdEyeOff
                            className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
                            onClick={() => setshow((prev) => !prev)}
                        />
                    )}
                </div>
                <button className="px-[50px] py-[10px] bg-red-600 text-white rounded-lg md:px-[100px] mt-[12px]" disabled={loading}>
                    {loading ? "Loading..." : "Signup"}
                </button>
                <p className="text-[18px]">
                    Already have an account ?{" "}
                    <span
                        className="text-[19px] cursor-pointer text-red-600"
                        onClick={() => navigate("/login")}
                    >
                        Login{" "}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
