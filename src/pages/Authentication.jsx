import React, { useState,useEffect } from "react";
import { PiSmileyXEyes, PiSmiley } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../Slices/userSlice";

const Authentication = () => {
  let disp = useDispatch();

  let nevigate = useNavigate();
  let data = useSelector((state) => state);
  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    profession: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // signup functionality starts here

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowPassword1 = () => {
    setShowPassword1((show) => !show);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2((show) => !show);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    if (signupData.password !== signupData.confirmPassword) {
      toast("Passwords do not match. Please confirm your password again.");
      return;
    }

    const { confirmPassword, ...dataToSend } = signupData;

    axios
      .post("http://localhost:3000/auth/registration", dataToSend)
      .then((response) => {
        if (response.data.error) {
          return toast(response.data.error);
        }
        if (response.data.message) {
          setLogin(false);
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = () => {
    const { email, password } = loginData;

    axios
      .post("http://localhost:3000/auth/login", { email, password })
      .then((response) => {
        if (response.data.error) {
          toast(response.data.error);
          setLogin(true);
          return;
        }
        if (response.data.message) {
          const userData = response.data.user;
          nevigate("/home")
          localStorage.setItem("userData", JSON.stringify(userData));
          disp(activeUser(userData));
          console.log(userData);
          toast(response.data.message);
          setLoginData({
            email: "",
            password: "",
          });
          // Save login data in local storage
          
          
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // redirect to home with data
  useEffect(() => {
    if (data.userData.userInfo) {
      nevigate("/home");
    }
  }, []);


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
            // ... your existing signup form code
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
                  onClick={handleClickShowPassword1}
                  className="absolute z-10 right-5 top-[50%] translate-y-[-50%] text-[35px] text-white hover:cursor-pointer"
                >
                  {showPassword1 ? <PiSmiley /> : <PiSmileyXEyes />}
                </div>
                <input
                  type={showPassword1 ? "text" : "password"}
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
                  onClick={handleClickShowPassword2}
                  className="absolute z-10 right-5 top-[50%] translate-y-[-50%] text-[35px] text-white hover:cursor-pointer"
                >
                  {showPassword2 ? <PiSmiley /> : <PiSmileyXEyes />}
                </div>
                <input
                  type={showPassword2 ? "text" : "password"}
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
            // login form starts
            <div className="flex flex-col gap-y-5">
              {/* email input */}
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email..."
                value={loginData.email}
                onChange={handleLoginInputChange}
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
                  name="password"
                  placeholder="Enter Your Password..."
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  className="glass-bg w-full !p-[15px] !md:p-[30px] !pr-[70px] border-none outline-none rounded-3xl text-white"
                />
              </div>
              {/* login button */}
              <div
                onClick={handleLogin}
                className={` rounded-2xl   hover:!bg-white hover:!text-colorprimary selection:bg-transparent !text-white  py-2 text-center !font-rale font-semibold bg-colorprimary duration-300`}
              >
                Login
              </div>
              <span>
                Forgot Password?{" "}
                <span className="text-colorprimary font-semibold">
                  Click Here.
                </span>
              </span>
            </div>
            // login form end
          )}
        </div>
        <div className="p-10 w-full text-transparent"></div>
      </div>
    </>
  );
};

export default Authentication;
