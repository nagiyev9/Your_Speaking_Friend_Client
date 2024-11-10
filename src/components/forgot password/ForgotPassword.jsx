import { message } from "antd";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { forgotPassword } from "../../services/auth.service";

const ForgotPassword = () => {
  const [email, setEmail] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
        forgotPassword(email).then((data) => {
          if (data.status === 200) {
            message.info(data.message || "Password reset email has been sent! Check your inbox.");
          } else {
            message.error(data.error || "Failed to confirm account");
          }
        });
    } catch (error) {
      message.error("An error occurred while confirming the account");  
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-pink-400 via-purple-500 to-blue-600">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Forgot Password
        </h2>

        <form className="space-y-5" onSubmit={handleEmail}>
          <div className="relative">
            <label className="block text-gray-700 font-medium">
              Enter Account Email
            </label>
            <div className="flex items-center border rounded-lg mt-2">
              <FaUserAlt className="mx-3 text-gray-400" />
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

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 hover:bg-blue-700 transform hover:scale-105"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
