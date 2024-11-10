import React from "react";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* LinkedIn and GitHub Links */}
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/nagiyev-mahaddin-3395a72a0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <LinkedinOutlined className="text-2xl" />
          </a>
          <a
            href="https://github.com/nagiyev9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <GithubOutlined className="text-2xl" />
          </a>
        </div>

        {/* Copyright and Project Info */}
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-sm">Project created by Mahaddin Nagiyev</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
