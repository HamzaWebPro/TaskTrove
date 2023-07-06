import React, { useState } from "react";
import CommonButton from "../components/CommonButton";
import { PiSmileyXEyes, PiSmiley } from "react-icons/pi";
import { Link } from "react-router-dom";

const Authentication = () => {
  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <div className="w-full h-full flex  items-center flex-col">
        <h1 className="font-semibold">TaskTrove.</h1>
        <p className="mb-4">Stay Organized, Stay Ahead.</p>
        <div className="glass-bg w-full  md:w-[35%]   rounded-2xl p-4">
          <div className="w-full flex justify-between mb-4">
            {/* login signup buttons */}
            {/* login button */}
            <div
              onClick={() => setLogin(false)}
              className={`${
                !login ? "bg-colorprimary" : "glass-bg"
              } rounded-2xl w-[48%]  py-3 text-center !!font-rale font-semibold hover:bg-colorprimary duration-300`}
            >
              Login
            </div>
            {/* Signup button */}
            <div
              onClick={() => setLogin(true)}
              className={`${
                login ? "bg-colorprimary" : "glass-bg"
              } rounded-2xl w-[48%]  py-3 text-center !!font-rale font-semibold hover:bg-colorprimary duration-300`}
            >
              Sign up
            </div>
          </div>
          {login ? (
            <div className="flex flex-col gap-y-5">
              {/* signup form */}
              {/* name ninput */}
              <input
                type="text"
                placeholder="Enter Your Name*"
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* email ninput */}
              <input
                type="email"
                placeholder="Enter Your Email*"
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* profession input */}
              <input
                type="text"
                placeholder="Enter Your Profession*"
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* password input */}
              <div className="relative w-full cursor-pointer selection:bg-transparent">
                <div
                  onClick={handleClickShowPassword}
                  className="absolute z-10 right-5 top-[50%] translate-y-[-50%] text-[35px] text-white hover:cursor-pointer"
                >
                  {showPassword ? <PiSmiley /> : <PiSmileyXEyes />}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a Password*"
                  className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none outline-none rounded-3xl text-white"
                />
              </div>
              {/* confirm passsword password input */}
              <div className="relative w-full cursor-pointer selection:bg-transparent">
                <div
                  onClick={handleClickShowPassword}
                  className="absolute z-10 right-5 top-[50%] translate-y-[-50%] text-[35px] text-white hover:cursor-pointer"
                >
                  {showPassword ? <PiSmiley /> : <PiSmileyXEyes />}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password*"
                  className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none outline-none rounded-3xl text-white"
                />
              </div>
               {/* user image input */}
               <span>Choose your profile picture*</span>
               <input
                type="file"
                placeholder="Choose you photo"
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* Sign up button */}
              <div
                className={` rounded-2xl  hover:bg-white hover:text-colorprimary selection:bg-transparent  py-2 text-center !!font-rale font-semibold bg-colorprimary duration-300`}
              >
                Sign up
              </div>
            </div>
            
          ) : (
            // login form
            <div className="flex flex-col gap-y-5">
              {/* email ninput */}
              <input
                type="email"
                placeholder="Enter Your Email..."
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* password input */}
              <div className="relative w-full cursor-pointer selection:bg-transparent">
                <div
                  onClick={handleClickShowPassword}
                  className="absolute z-10 right-5 top-[50%] translate-y-[-50%] text-[35px] text-white hover:cursor-pointer"
                >
                  {showPassword ? <PiSmiley /> : <PiSmileyXEyes />}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password..."
                  className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none outline-none rounded-3xl text-white"
                />
              </div>
              {/* login button */}
              <Link
              to="/home"
                className={` rounded-2xl   hover:!bg-white hover:!text-colorprimary selection:bg-transparent !text-white  py-2 text-center !font-rale font-semibold bg-colorprimary duration-300`}
              >
                Login
              </Link>
          <span>
            Forgot Password?{" "}
            <span className="text-colorprimary font-semibold">Click Here.</span>
          </span>
            </div>
          )}
        </div>
        <div className="p-10 w-full text-transparent"></div>
      </div>
    </>
  );
};

export default Authentication;
