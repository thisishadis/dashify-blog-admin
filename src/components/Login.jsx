import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await loginUser(username, password);
      console.log("Response data:", data);
      navigate("/posts");
    } catch (error) {
      console.error(error.message);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
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
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* submit btn */}
        <button
          className="btn w-full btn-primary btn-sm mt-2"
          onClick={handleLogin}
          disabled={loading} 
        >
          {loading ? "Logging in..." : "Login"}
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
