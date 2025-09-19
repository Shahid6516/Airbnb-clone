import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { authDataContext } from "../Context/AuthContext";

import axios from "axios";
import { userDataContext } from "../Context/UserContext";


const Login = () => {
  const [show, setshow] = useState("false");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userDataContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { serverUrl, loading, setLoading } = useContext(authDataContext)


  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const result = await axios.post(serverUrl + "/api/auth/login", {
        email,
        password
      }, { withCredentials: true });
      setLoading(false)
      setUserData(result.data)
      navigate("/")
      console.log(result);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">

      <div className="w-[50px] h-[50px] text-white bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center" onClick={() => navigate("/")}><FaArrowLeft className="w-[25px] h-[25px]" />
      </div>

      <form
        action="
                "
        className="max-w-[900px] w-full md:w-[90%]  h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]"
        onSubmit={handleLogin}
      >
        <h1 className="text-[45px] md:text-5xl text-black">
          Welcome to Airbnb
        </h1>


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
        <button className="px-[50px] py-[10px] bg-red-600 text-white rounded-lg md:px-[100px]" disabled={loading}>
          {loading ? "Loading..." : 'Login'}
        </button>
        <p className="text-[18px]">Don't have an account ? <span className="text-[19px] text-red-600 cursor-pointer" onClick={() => navigate("/signup")}>Signup </span></p>
      </form>
    </div>

  )
}

export default Login