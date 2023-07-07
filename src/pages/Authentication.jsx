import React, { useState } from "react";
import { PiSmileyXEyes, PiSmiley } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Authentication = () => {
  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    profession: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(signupData);
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSignupData((prevState) => ({
  //     ...prevState,
  //     profilePicture: file ? file : "",
  //   }));

  // };

  const handleSignup = () => {
    if (signupData.password !== signupData.confirmPassword) {
      // Passwords do not match, show error message or perform desired action
      toast("Passwords do not match. Please confirm your password again.");
      return; // Stop execution if passwords do not match
    }

    // Exclude confirmPassword from signupData
    const { confirmPassword, ...dataToSend } = signupData;
    // Send signupData to localhost:3000 using Axios
    axios
      .post("http://localhost:3000/auth/registration", dataToSend)
      .then((response) => {
        // Handle response
        console.log(response.data);
        if(response.data.error){
        return  toast(response.data.error);

        }
        if(response.data.message){
          setLogin(false)
          toast(response.data.message);
          setSignupData({
            name: "",
            email: "",
            profession: "",
            password: "",
            confirmPassword: "",
            profilePicture: "",
          });

        }


        // Clear input fields
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <>
      <ToastContainer />
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
            {/* Signup button start */}
            <div
              onClick={() => setLogin(true)}
              className={`${
                login ? "bg-colorprimary" : "glass-bg"
              } rounded-2xl w-[48%]  py-3 text-center !!font-rale font-semibold hover:bg-colorprimary duration-300`}
            >
              Sign up
            </div>
            {/* signup button end */}
          </div>
          {login ? (
            // signup form start
            <div className="flex flex-col gap-y-5">
              {/* signup form */}
              {/* name input */}
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name*"
                value={signupData.name}
                onChange={handleInputChange}
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* email input */}
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email*"
                value={signupData.email}
                onChange={handleInputChange}
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* profession input */}
              <input
                type="text"
                name="profession"
                placeholder="Enter Your Profession*"
                value={signupData.profession}
                onChange={handleInputChange}
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
                  name="password"
                  placeholder="Enter a Password*"
                  value={signupData.password}
                  onChange={handleInputChange}
                  className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none outline-none rounded-3xl text-white"
                />
              </div>
              {/* confirm password input */}
              <div className="relative w-full cursor-pointer selection:bg-transparent">
                <div
                  onClick={handleClickShowPassword}
                  className="absolute z-10 right-5 top-[50%] translate-y-[-50%] text-[35px] text-white hover:cursor-pointer"
                >
                  {showPassword ? <PiSmiley /> : <PiSmileyXEyes />}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password*"
                  value={signupData.confirmPassword}
                  onChange={handleInputChange}
                  className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none outline-none rounded-3xl text-white"
                />
              </div>
              {/* user image input */}
              <span>Choose your profile picture*</span>
              <input
                type="file"
                name="profilePicture"
                // onChange={handleFileChange}
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* Sign up button */}
              <div
                onClick={handleSignup}
                className={` rounded-2xl  hover:bg-white hover:text-colorprimary selection:bg-transparent  py-2 text-center !!font-rale font-semibold bg-colorprimary duration-300`}
              >
                Sign up
              </div>
            </div>
          ) : (
            // login form
            <div className="flex flex-col gap-y-5">
              {/* email input */}
              <input
                type="email"
                placeholder="Enter Your Email..."
                className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none !font-rale outline-none rounded-3xl text-white"
              />
              {/* password input */}
              <div className="relative w-full cursor-pointer selection:bg-transparent">
                <div
                  onClick={handleClickShowPassword}
                  className="absolute z-10 right-5 top-[50%] translate-y-[-50%] text-[35px] textwhite hover:cursor-pointer"
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
                <span className="text-colorprimary font-semibold">
                  Click Here.
                </span>
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
