import { message } from "antd";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { updatePassword } from "../../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const location = useLocation();
  const quesryParams = new URLSearchParams(location.search);
  const token = quesryParams.get("token");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      updatePassword(newPassword, token).then((data) => {
        if (data.status === 200) {
          message.success(data.message || "Password updated successfully");
          navigate("/login");
        } else {
          if (data.errors) {
            setValidationErrors(data.errors);
          } else {
            message.error(data.error || "Failed to update password");
          }
        }
      });
    } catch (error) {
      message.error("An error occurred while updating the password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-pink-400 via-purple-500 to-blue-600">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Reset Password
        </h2>

        <form className="space-y-5" onSubmit={handleEmail}>
          <div className="relative">
            <label className="block text-gray-700 font-medium">
              Enter New Password
            </label>
            <div className="flex items-center border rounded-lg mt-2">
              <FaUserAlt className="mx-3 text-gray-400" />
              <input
                type="password"
                name="newPassword"
                className="w-full p-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
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
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
