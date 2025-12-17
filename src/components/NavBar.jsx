import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // modern icons
import { Link } from "react-router-dom"; // ✅ import Link
<<<<<<< HEAD
import logo from "../assets/logo.jpeg"; // updated logo path
=======
import logo from "../assets/logo.png";
>>>>>>> 8678a27dbd5e92fea84c27e92521586b01983622

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },        // now routes
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
<<<<<<< HEAD
                className="h-15 mt-1 w-18 cursor-pointer"
=======
                className="h-20 mt-3 w-auto cursor-pointer"
>>>>>>> 8678a27dbd5e92fea84c27e92521586b01983622
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative text-gray-700 font-medium hover:text-blue-600 transition duration-300 group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mx-4 mt-2 overflow-hidden">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-6 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
