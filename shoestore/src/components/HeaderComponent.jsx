/* eslint-disable react/prop-types */
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/images/logo.png";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import "../css/HeaderComponent.css";
import { toast } from "react-toastify";

function HeaderComponent({ setCurrentUser, currentUser, countOrder = -1 }) {
  const navigate = useNavigate();
  const [isShowNav, setIsShowNav] = useState(false);
  function handleLogout() {
    window.localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  }

  return (
    <div className="">
      <div
        className="grid grid-cols-3 px-40 header p-1 mb-0"
        style={{ backgroundColor: "#000000ff", color: "white" }}
      >
        <div className="font-bold text-3xx">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-20" />
          </Link>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => {
            setIsShowNav(true);
          }}
          className="header-bar-icon"
        />
        {isShowNav && (
          <div
            onClick={() => {
              setIsShowNav(false);
            }}
            className="overlay"
          ></div>
        )}
        <div
          className={`col-start-2 col-end-4 flex justify-end items-center nav ${isShowNav && "active"
            }`}
        >
          <div className="items-center justify-between ">
            <ul className="flex flex-col text-sm font-medium md:flex-row md:space-x-8 md:mt-0">
              <li>
                <Link to={"/"}>Home</Link>
              </li>

              <li>
                <Link to={"/about"}>About Us</Link>
              </li>
              {/* <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li> */}
              {currentUser?.id > 0 && (
                <li>
                  <Link to={"/profile"}>My account</Link>
                </li>
              )}

              {currentUser?.role === 1 && (
                <li className="text-white-800 font-bold">
                  <div
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.cursor = "pointer")
                    }
                    onClick={() => {
                      navigate("/admin/bill");
                      // if (window.localStorage.getItem("newLogin")) {
                      //   window.location.reload();
                      //   window.localStorage.removeItem("newLogin");
                      // }
                    }}
                  >
                    Go to admin
                  </div>
                </li>
              )}

              {currentUser && (
                <li className="text-white-800 font-bold">
                  <button onClick={() => handleLogout()}>Log out</button>
                </li>
              )}
              <li>
                <div className="flex items-center justify-end login-button">
                  <div className="text-sm mr-2">
                    {currentUser?.firstName ? (
                      <span>
                        Hi,{" "}
                        {currentUser?.firstName + " " + currentUser?.lastName}!
                      </span>
                    ) : (
                      <div>
                        <span className="pr-2">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <Link to={"/login"}>Login</Link> /{" "}
                        <Link to={"/signup"}>Sign up</Link>
                      </div>
                    )}
                  </div>
                </div>
              </li>

              <li>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={e => {
                    if (currentUser) {
                      navigate("/purchase");
                    } else {
                      toast.error("Please login to use cart!");
                    }
                  }}>
                  <span className="pr-2 relative inline-flex items-center">
                    <FontAwesomeIcon icon={faCartShopping} />
                    {countOrder > 0 && (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                        {countOrder}
                      </div>
                    )}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
