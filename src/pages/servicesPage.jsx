import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import logo from "../../src/assets/images/4.png";
import ServiceList from '../components/ServicesTunning/ServicesList';

const ServicePage = () => {
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');
      if (token && userId) {
        setIsLoggedIn(true);
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            console.error('Error fetching user profile:', response.statusText);
            navigate('/login'); // Redirect to login on error
            return;
          }

          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          navigate('/login'); // Redirect to login on error
        }
      }
    };

    fetchUserData();
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setIsLoggedIn(false);
  };

  const navigateProfile = () => {
    navigate('/profile');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  const navigateToServices = () => {
    navigate('/services');
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
    window.location.reload();
  };

  if (loading) {
    return <Loader />;
  }

  const dropdownContent = isLoggedIn ? (
    <>
      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={navigateProfile}>Profile</li>
      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</li>
    </>
  ) : (
    <>
      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={navigateLogin}>Login</li>
      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={navigateToRegister}>Register</li>
    </>
  );

  return (
    <div id='Home' className='w-full h-full'>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />

      <nav className="bg-gray-800 p-3 shadow-lg w-full z-50 sticky top-0">
        <ul className="flex justify-between items-center text-white">
          <img className="w-16 h-26 ml-6 cursor-pointer" src={logo} alt="mainImageCorp" onClick={handleHomeClick} />
          <div className="flex space-x-12 mr-32">
            <li className="nav_item">
              <a href="products" className="nav_link hover:text-red-400 transition duration-300 text-4xl">PRODUCTS</a>
            </li>
            <li className="nav_item">
              <a href="services" className="nav_link hover:text-red-400 transition duration-300 text-4xl" onClick={navigateToServices}>SERVICES</a>
            </li>
            <li className="nav_item">
              <a href="" className="nav_link hover:text-red-400 transition duration-300 text-4xl" onClick={handleHomeClick}>HOME</a>
            </li>
          </div>
          <div className="relative mr-4 dropdown-container">
            {isLoggedIn && userData?.image ? (
              <img
                src={`http://localhost:3000${userData.image}`}
                alt="Profile"
                className='w-12 h-12 rounded-full cursor-pointer'
                onClick={toggleDropdown}
              />
            ) : (
              <i className='bx bx-user-circle text-4xl cursor-pointer hover:text-red-400 transition duration-300' onClick={toggleDropdown}></i>
            )}
            {dropdownOpen && (
              <ul className="absolute right-0 bg-white text-black shadow-lg mt-2 rounded w-28">
                {dropdownContent}
              </ul>
            )}
          </div>
        </ul>
      </nav>
      <div className="services-container">
        <ServiceList />
      </div>
    </div>
  );
};

export default ServicePage;
