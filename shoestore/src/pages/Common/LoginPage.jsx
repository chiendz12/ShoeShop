import { useState } from "react";
import banner from "../../assets/images/banner.svg";

import { ToastContainer, toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import "./css/loginPage.scss";
import { login } from "../../services/api";
function LoginPage({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    if (username && password) {
      login(username, password).then((result) => {
        if (result.status === "ok") {
          toast.success("Login Success!", {
            autoClose: 1000,
          });
          localStorage.setItem("user", JSON.stringify(result.data));
          setCurrentUser(result.data);
          navigate("/");
        } else
          toast.error("Login Failed!", {
            autoClose: 1000,
          });
      });
    } else {
      toast.error("Do not leave information blank!", {
        autoClose: 1000,
      });
    }
  }

  return (
    <>
      <ToastContainer />;
      <div className="grid grid-cols-2 gap-2 h-screen p-10 login-page">
        <div className="p-10">
          <div className="text-center text-3xl font-semibold">
            LOG IN ACCOUNT
          </div>
          <div className="mt-16">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              onClick={() => handleSubmit()}
            >
              Login
            </button>
            <div className="mt-6">
              <div className="text-center">
                You don't have an account?{" "}
                <span>
                  <Link to={"/signup"} style={{ textDecoration: "underline" }}>
                    Register now
                  </Link>
                </span>
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

export default LoginPage;
