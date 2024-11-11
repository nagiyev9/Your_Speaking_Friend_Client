import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-6">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-700 mt-2 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={goToHome}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition ease-in-out duration-300"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default Error;
