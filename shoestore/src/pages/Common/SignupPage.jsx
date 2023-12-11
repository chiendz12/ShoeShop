/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useState } from "react";
import banner from "../../assets/images/banner.svg";

import { ToastContainer, toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import "./css/signupPage.scss";
import { register } from "../../services/api";

function SignupPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const set = (prop, value) => {
    setUser({ ...user, [prop]: value });
  };
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit() {
    if (
      user.username &&
      user.firstName &&
      user.lastName &&
      user.password &&
      confirmPassword
    ) {
      if (confirmPassword === user.password) {
        register(user).then((result) => {
          if (result.status === "ok") {
            toast.success("Signup Success!", {
              autoClose: 1000,
            });
            navigate("/login");
          } else
            toast.error("Signup Failed!", {
              autoClose: 1000,
            });
        });
      } else {
        toast.error("Wrong confirmation password!", {
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Do not leave information blank!", {
        autoClose: 1000,
      });
    }
  }

  return (
    <>
      <ToastContainer />;
      <div className="grid grid-cols-2 gap-2 h-screen p-10 signup-page">
        <div className="p-10">
          <div className="text-center text-3xl font-semibold">
            SIGN UP ACCOUNT
          </div>
          <div className="mt-16">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Enter Username"
                value={user.username}
                onChange={(e) => set("username", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => set("password", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div className="mb-4 mr-2" style={{ width: "50%" }}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  placeholder="Enter First Name"
                  value={user.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                />
              </div>
              <div className="mb-4 ml-2" style={{ width: "50%" }}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  placeholder="Enter Last Name"
                  value={user.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
              </div>
            </div>

            <button
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              onClick={(e) => handleSubmit(e)}
            >
              Đăng ký
            </button>
            <div className="mt-6">
              <div className="text-center">
                <Link to={"/login"} style={{ textDecoration: "underline" }}>
                  Login now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <img src={banner} alt="banner" />
        </div>
      </div>
    </>
  );
}

export default SignupPage;
