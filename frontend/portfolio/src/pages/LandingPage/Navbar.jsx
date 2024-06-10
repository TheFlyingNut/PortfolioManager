import React, { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row  items-center p-4 lg:p-8">
      <div className="flex justify-between w-full lg:w-auto">
        <h1 className="text-[#263238] text-3xl lg:text-3xl font-semibold mb-2 md:mb-0">
          Portfolio
        </h1>
        <div className="lg:hidden">
          <button
            className="text-xl lg:text-2xl text-[#263238] cursor-pointer"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <div className={`hidden lg:flex flex-grow justify-center`}>
        <ul className="flex gap-4 items-center">
          <li className="text-lg lg:text-xl text-[#263238]">Home</li>
          <li className="text-lg lg:text-xl text-[#263238]">About</li>
          <li className="text-lg lg:text-xl text-[#263238]">Features</li>
          <li className="text-lg lg:text-xl text-[#263238]">How it works</li>
        </ul>
      </div>
      {menuOpen && (
        <div className="lg:hidden mt-4 ">
          <ul className="flex flex-col gap-4 items-center">
            <li className="text-lg lg:text-xl text-[#263238]">Home</li>
            <li className="text-lg lg:text-xl text-[#263238]">About</li>
            <li className="text-lg lg:text-xl text-[#263238]">How it works</li>
            <li className="text-lg lg:text-xl text-[#263238]">How it works</li>
          </ul>
          <div className="flex gap-4 lg:gap-5 mt-4 lg:mt-0">
            <button
              className="border-black px-4 py-2 border-2 rounded-lg"
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </button>
            <button className="bg-[#473A6C] px-4 py-2 border-[#473A6C] rounded-lg border-2 text-white">
              Get Started
            </button>
          </div>
        </div>
      )}
      <div className="hidden lg:flex gap-4 lg:gap-5 mt-4 lg:mt-0">
        <button
          className="border-black px-4 py-2 border-2 rounded-lg hover:bg-[#473A6C] hover:border-[#473A6C] hover:text-white"
          onClick={() => navigate("/sign-in")}
        >
          Sign in
        </button>
        <button
          className="border-black px-4 py-2 border-2 rounded-lg hover:bg-[#473A6C] hover:border-[#473A6C] hover:text-white"
          onClick={() => navigate("/sign-up")}
        >
          Register
        </button>
        {/* <button className="bg-[#473A6C] px-4 py-2 border-[#473A6C] rounded-lg border-2 text-white">
          Get Started
        </button> */}
      </div>
      {/* This section will be visible on mobile screens */}
    </div>
  );
};

export default Navbar;
