import React, { useEffect, useState } from "react";
import { FiBell, FiLogOut, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { activeUser } from "../Slices/userSlice";

const Navs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let data = useSelector((state) => state);
  let navigate = useNavigate();
let  disp = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (!data.userData.userInfo) {
      navigate("/");
    }
  }, []);

  let logout = () => {
    localStorage.removeItem("userData");
    disp(activeUser(null));
    navigate("/");
  };
  return (
    <>
      <nav className="glass-bg w-[97%] p-3 flex rounded-2xl fixed left-[50%] z-2 translate-x-[-50%] items-center justify-between">
        <h3 className="!m-0 !p-0">TaskTrove.</h3>
        <div className="flex gap-x-4">
            <FiUser className="text-[25px]"/>
          <div className="relative">
            <div className="notification-badge"></div>
            <FiBell
              className={`notification-icon text-[25px] ${
                isDropdownOpen ? "active" : ""
              }`}
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown glass-bg  rounded-2xl">
                {/* Notification Dropdown Content */}
                <div className="notification-item flex gap-x-2 border-b border-[#ffffff38] py-3">
                  <div className="w-[25%]">
                    <img
                      src="https://i.postimg.cc/vmmxHVLR/IMG-2794-EDITED.png"
                      alt="User Avatar"
                      className="avatar rounded-full"
                    />
                  </div>
                  <div className="notification-info">
                    <h6 className="user-name">John Doe</h6>
                    <small className="notification-text">
                      You have a new message.You have a new message.
                    </small>
                    <br />
                    <small className="text-[10px] text-[#ffffff6c]">
                      Few seconds ago
                    </small>
                  </div>
                </div>
                {/* Notification Dropdown Content */}
                <div className="notification-item flex gap-x-2 border-b border-[#ffffff38] py-3">
                  <div className="w-[25%]">
                    <img
                      src="https://i.postimg.cc/vmmxHVLR/IMG-2794-EDITED.png"
                      alt="User Avatar"
                      className="avatar rounded-full"
                    />
                  </div>
                  <div className="notification-info">
                    <h6 className="user-name">John Doe</h6>
                    <small className="notification-text">
                      You have a new message.You have a new message.
                    </small>
                    <br />
                    <small className="text-[10px] text-[#ffffff6c]">
                      Few seconds ago
                    </small>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to="/">
            <FiLogOut
              onClick={logout}
              className="logout-icon text-[25px] !text-white"
            />
          </Link>
        </div>
      </nav>

      <style>
        {`
          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 10px;
            height: 10px;
            background-color: red;
            border-radius: 50%;
          }

          .notification-icon {
            color: white;
            animation: shake 0.5s ease-in-out infinite;
            transform-origin: center;
          }

          .notification-icon.active {
            animation: none;
          }
          @keyframes shake {
            0% {
              transform: rotate(0);
            }
            10% {
              transform: rotate(10deg);
            }
            20% {
              transform: rotate(-10deg);
            }
            30% {
              transform: rotate(10deg);
            }
            40% {
              transform: rotate(-10deg);
            }
            50% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(0);
            }
          }
          .dropdown {
            position: absolute;
            top: calc(100% + 45px);
            right: -57px;
            min-width: 280px;
            
           
      
            padding: 10px;
            z-index: 10;
          }

          .dropdown .notification-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }

          .dropdown .notification-item:last-child {
            margin-bottom: 0;
            border-bottom:none;
          }

          .dropdown .avatar {
            width:35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .dropdown .user-name {
            margin: 0;
            font-weight: bold;
          }

          .dropdown .notification-text {
            margin: 0;
       
          }
        `}
      </style>
    </>
  );
};

export default Navs;
