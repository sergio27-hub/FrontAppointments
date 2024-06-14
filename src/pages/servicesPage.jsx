import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import logo from "../../src/assets/images/4.png";
import ServiceList from '../components/ServicesTunning/ServicesList';

const ServicePage = () => {
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeLink, setActiveLink] = useState('');
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
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            console.error('Error fetching user profile:', response.statusText);
            navigate('/Services'); 
            return;
          }

          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          navigate('/Services'); 
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
    localStorage.removeItem('roles');
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

  const navigateHome = () => {
    navigate('/');
  };

  const navigateToAbout = () => {
    navigate('/PageInfo');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHomeClick = () => {
    navigate('/');
    window.location.reload();
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
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
    <div id='Services' className='w-full h-full'>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />

      <nav className="bg-gray-800 p-3 shadow-lg w-full z-50 sticky top-0">
        <ul className="flex flex-col md:flex-row justify-between items-center text-white">
          <div className="flex justify-between w-full md:w-auto items-center">
            <img className="w-16 h-26 ml-6 cursor-pointer" src={logo} alt="mainImageCorp" onClick={handleHomeClick} />
            <div className="flex md:hidden">
              <button id="nav-toggle" onClick={handleMenuToggle}>
                <i className="bx bx-menu text-4xl cursor-pointer"></i>
              </button>
            </div>
          </div>
          <div className={`${menuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 w-full md:w-auto mt-4 md:mt-0`} id="nav-menu">
            <li className={`nav_link ${activeLink === 'about' ? 'active' : ''}`} onClick={() => navigateToAbout()}>
              <a href="#about" className="nav_link active hover:text-red-400 transition duration-300 text-xl md:text-4xl">ABOUT CORP</a>
            </li>
            <li className={`nav_link ${activeLink === 'products' ? 'active' : ''}`} onClick={() => handleLinkClick('products')}>
              <a href="#about" className="nav_link hover:text-red-400 transition duration-300 text-xl md:text-4xl">PRODUCTS</a>
            </li>
            <li className={`nav_link ${activeLink === 'services' ? 'active' : ''}`} onClick={() => { handleLinkClick('services'); navigateToServices(); }}>
              <a href="#skills" className="nav_link hover:text-red-400 transition duration-300 text-xl md:text-4xl">SERVICES</a>
            </li>
            <li className={`nav_link ${activeLink === 'home' ? 'active' : ''}`} onClick={() => navigateHome()}>
              <a href="#Home" className="nav_link hover:text-red-400 transition duration-300 text-xl md:text-4xl">HOME</a>
            </li>
          </div>
          <div className="relative mt-0 md:mt-0 dropdown-container">
            {isLoggedIn && userData?.image ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${userData.image}`}
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
      <div className="h-full w-full Profile">
        <ServiceList />
      </div>
    </div>
  );
};

export default ServicePage;
