import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-900 flex justify-between items-center px-6 py-3 shadow-md">
      {/* Logo */}
      <div className="text-white text-2xl font-bold"><span><span className="text-green-500">&lt;</span>Pass</span><span className="text-green-500">OP/&gt;</span></div>

      {/* Navigation Links */}
      <ul className="flex gap-8 text-white text-lg font-medium">
        <li className="hover:text-gray-200 cursor-pointer transition">Home</li>
        <li className="hover:text-gray-200 cursor-pointer transition">Contact</li>
        <li className="hover:text-gray-200 cursor-pointer transition">About</li>
      </ul>
      <button className="w-9 py-1 px-1 cursor-pointer text-white bg-green-500 rounded-4xl">
        <img src="github-brands.svg" alt="github logo" />
      </button>
    </nav>
  );
};

export default Navbar;
