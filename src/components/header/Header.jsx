import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";
import { setAuthToken } from "../../services/token.service";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && typeof token === "string") {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token", error);
        localStorage.removeItem("token");
      }
    } else {
      setUserRole(null);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4 md:px-8 lg:px-16 min-h-[100px]">
        {/* Logo Section */}
        <div>
          <RouterLink
            to="/"
            className="font-bold text-2xl md:text-3xl text-blue-600"
          >
            YourSpeakingFriend
          </RouterLink>
        </div>

        {/* Burger Menu Icon for Tablet and Below */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex flex-col lg:flex-row gap-6 absolute lg:static bg-white w-full lg:w-auto top-[80px] left-0 lg:top-0 px-6 py-5 lg:px-0 ${
            menuOpen ? "block" : "hidden"
          } lg:flex items-center transition-all`}
          style={{ zIndex: 9999 }}
        >
          {["introduction", "features", "command-list", "actions"].map(
            (link) => (
              <ScrollLink
                key={link}
                to={link}
                smooth={true}
                duration={500}
                offset={-120}
                className="hover:text-blue-600 transition text-gray-700 font-semibold cursor-pointer"
              >
                <RouterLink to="/">
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </RouterLink>
              </ScrollLink>
            )
          )}

          {localStorage.getItem("token") ? (
            <>
              <RouterLink
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition font-semibold"
                onClick={() => {
                  setAuthToken(null);
                }}
              >
                Logout
              </RouterLink>
            </>
          ) : (
            <>
              <RouterLink
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition font-semibold"
              >
                Login
              </RouterLink>
              <RouterLink
                to="/signup"
                className="bg-blue-600 text-white border-2 py-1 px-4 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition"
              >
                Signup
              </RouterLink>
            </>
          )}
          {userRole === "admin" && (
            <RouterLink
              to="/admin/datas"
              className="bg-blue-600 text-white border-2 py-1 px-4 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition"
            >
              Dashboard
            </RouterLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
