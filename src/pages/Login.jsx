import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { message } from "antd";
import { setAuthToken } from "../services/token.service";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(formData);

    if (response.status === 200) {
      message.success(response.message);
      setAuthToken(response.token);
      navigate("/");
    } else {
      setAuthToken(null);
      message.error(response.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-purple-500">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Welcome Back!
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="relative">
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="flex items-center border rounded-lg mt-2">
              <FaUserAlt className="mx-3 text-gray-400" />
              <input
                type="email"
                className="w-full p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="flex items-center border rounded-lg mt-2">
              <FaLock className="mx-3 text-gray-400" />
              <input
                type="password"
                className="w-full p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold transition duration-300 hover:bg-purple-700 transform hover:scale-105"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <p className="text-center text-gray-700 mt-3">
          You forgot the password?{" "}
          <Link
            to="/help/forgot-password"
            className="text-purple-600 font-medium hover:underline"
          >
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
