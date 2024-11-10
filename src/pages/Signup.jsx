import { message } from "antd";
import React, { useState } from "react";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/auth.service";

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(signupData);
      if (data.status === 200) {
        sessionStorage.setItem("unConfirmedUser", JSON.stringify(data.unConfirmedUser));
        sessionStorage.setItem("confirmCode", btoa(data.confirmCode));
        message.success(data.message);
        navigate("/signup/confirm");
      } else {
        if (data.errors) {
          setValidationErrors(data.errors);
        } else {
          message.error(data.error);
        }
      }
    } catch (error) {
      message.error(
        "An error occurred during the signup process. Please try again later."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-pink-400 via-purple-500 to-blue-600">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSignUp}>
          <div className="relative">
            <label className="block text-gray-700 font-medium">Name</label>
            <div className="flex items-center border rounded-lg mt-2">
              <FaUserAlt className="mx-3 text-gray-400" />
              <input
                type="text"
                name="name"
                className="w-full p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium">Surname</label>
            <div className="flex items-center border rounded-lg mt-2">
              <FaUserAlt className="mx-3 text-gray-400" />
              <input
                type="text"
                name="surname"
                className="w-full p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your surname"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="flex items-center border rounded-lg mt-2">
              <FaEnvelope className="mx-3 text-gray-400" />
              <input
                type="email"
                name="email"
                className="w-full p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
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
                className="w-full p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                name="password"
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.map((error, index) => (
              <p key={index} className="text-red-500 text-sm mt-1">
                {error.message}
              </p>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 hover:bg-blue-700 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
