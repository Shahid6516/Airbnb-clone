import React, { useState } from 'react';
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setshow] = useState("false");
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        action="
                "
        className="max-w-[900px] w-full md:w-[90%]  h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]"
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
        <button className="px-[50px] py-[10px] bg-red-600 text-white rounded-lg md:px-[100px]">
          Login
        </button>
         <p className="text-[18px]">Don't have an account ? <span className="text-[19px] text-red-600 cursor-pointer" onClick={()=>navigate("/signup")}>Signup </span></p>
      </form>
    </div>

  )
}

export default Login