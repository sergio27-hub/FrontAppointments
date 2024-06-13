import React from 'react';
import logo from "../../assets/images/4.png";
import "./styles.css"

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="loader-container flex flex-col items-center">
        <img src={logo} alt="logo" className="loader-logo w-32 h-32" />
        <div className="loader-animation mt-4"></div>
      </div>
    </div>
  );
};

export default Loader;
