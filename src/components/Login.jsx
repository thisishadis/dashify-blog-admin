import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../common/Toast";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        // expiresInMins: 60, // optional
      }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/posts");
        } else {
          console.log("Login failed. Status Code:", res.status);
          toast.error("Login failed. Please check your credentials.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error("Error during login. Please try again later.");
      });
  };
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-80 flex flex-col justify-center items-center gap-3 p-4 bg-gray-100">
        <h3 className="text-3xl text-gray-500">LOGIN</h3>
        {/* next */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">username</span>
          </div>
          <input
            type="text"
            //   placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {/* password */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">password</span>
          </div>
          <input
            type="text"
            //   placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* submit btn */}
        <button
          className="btn w-full btn-primary btn-sm mt-2"
          onClick={handleLogin}
        >
          Login
        </button>
        {/* next */}
        <div className="flex gap-3 text-xs w-full">
          <p>Don't have account?</p>
          <button
            className="font-bold"
            onClick={() => {
              navigate("/");
            }}
          >
            Register now
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
