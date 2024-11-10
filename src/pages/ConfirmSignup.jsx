import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { confirmSignup } from "../services/auth.service";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ConfirmSignup = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setConfirmationCode(value ? parseInt(value, 10) : "");
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    try {
      const decodedCode = atob(sessionStorage.getItem("confirmCode"));
      const unConfirmedUser = JSON.parse(sessionStorage.getItem("unConfirmedUser"));
      if (decodedCode.toString() !== confirmationCode.toString()) {
        message.error("Confirmation code does not match");
        return;
      }
      const data = await confirmSignup({
        confirmationCode,
        ...unConfirmedUser
      });
      if (data.status === 201) {
        message.success(data.message || "Account confirmed successfully");
        sessionStorage.removeItem("unConfirmedUser");
        sessionStorage.removeItem("confirmCode");
        navigate("/login");
      } else {
        message.error(data.error || "Failed to confirm account");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while confirming the account");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-pink-400 via-purple-500 to-blue-600">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Confirm Account
        </h2>

        <form className="space-y-5" onSubmit={handleConfirmation}>
          <div className="relative">
            <label className="block text-gray-700 font-medium">
              Enter Confirmation Code
            </label>
            <div className="flex items-center border rounded-lg mt-2">
              <FaUserAlt className="mx-3 text-gray-400" />
              <input
                type="text"
                name="confirmationCode"
                className="w-full p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
                inputMode="numeric"
                pattern="[0-9]*"
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

export default ConfirmSignup;
