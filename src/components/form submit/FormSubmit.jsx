import React, { useState } from "react";
import { message } from "antd";
import { submitForm } from "../../services/form.service";

const FormSubmit = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (!token && token === null) {
        return message.info("You must be logged in to submit a form.");
      };

      submitForm(formData).then((data) => {
        if (data.status === 201) {
          setFormData({
            name: "",
            surname: "",
            email: "",
            message: "",
          });
          message.success(data.message || "Form submitted successfully.");
        } else {
          message.error(data.error || "Failed to submit form.");
        }
      })
    } catch (error) {
      message.error("An error occurred while submitting the form.");
    };
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-xl space-y-8 transform hover:scale-105 transition duration-500 ease-in-out">
      <h2 className="text-3xl font-semibold text-blue-700 text-center">
        Get in Touch with Us
      </h2>
      <p className="text-lg text-gray-600 text-center">
        We’d love to hear from you! Please fill out the form below.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label className="block text-gray-800 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            placeholder="Enter your name"
            onChange={handleInputChange}
            value={formData.name}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="block text-gray-800 font-medium">Surname</label>
          <input
            type="text"
            name="surname"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            placeholder="Enter your surname"
            onChange={handleInputChange}
            value={formData.surname}
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label className="block text-gray-800 font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            placeholder="Enter your email"
            onChange={handleInputChange}
            value={formData.email}
            required
          />
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label className="block text-gray-800 font-medium">Message</label>
          <textarea
            name="message"
            className="w-full min-h-[200px] p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            placeholder="Your message..."
            rows="6"
            onChange={handleInputChange}
            value={formData.message}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSubmit;
