import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import logo from "../../src/assets/images/4.png";

const InfoPage = () => {
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState('');
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
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            console.error('Error fetching user profile:', response.statusText);
            navigate('/login');
            return;
          }

          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          navigate('/login');
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
  const handleLinkClickToInfo = () => {
    navigate('/PageInfo');
  }

  const navigateLogin = () => {
    navigate('/login');
  };
  const handleHomeClick = () => {
    navigate('/');
    window.location.reload();
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
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
            <li className={`nav_link ${activeLink === 'about' ? 'active' : ''}`} onClick={() => handleLinkClickToInfo()}>
              <a href="#about" className="nav_link active hover:text-red-400 transition duration-300 text-xl md:text-4xl">ABOUT CORP</a>
            </li>
            <li className={`nav_link ${activeLink === 'products' ? 'active' : ''}`} onClick={() => handleLinkClick('products')}>
              <a href="#about" className="nav_link hover:text-red-400 transition duration-300 text-xl md:text-4xl">PRODUCTS</a>
            </li>
            <li className={`nav_link ${activeLink === 'services' ? 'active' : ''}`} onClick={() => { handleLinkClick('services'); navigateToServices(); }}>
              <a href="#skills" className="nav_link hover:text-red-400 transition duration-300 text-xl md:text-4xl">SERVICES</a>
            </li>
            <li className={`nav_link ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleHomeClick()}>
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
      <div className="bg-neutral-900 text-neutral-950 appointment">
        <main className="__className_017dd3">
          <div className="relative">
            <div className="sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4" style={{ height: '500px', background: 'black', color: 'white' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-4xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <h3 className="mb-6 text-center text-4xl font-semibold md:text-6xl">A new type of Calendar</h3>
              <p className="mb-8 max-w-lg text-center text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!
              </p>
              <a href="#" className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-violet-300 shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_white]">
                <span>Learn more</span>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4" style={{ height: '500px', background: 'white', color: 'black' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-4xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
              <h3 className="mb-6 text-center text-4xl font-semibold md:text-6xl">#1 in data privacy</h3>
              <p className="mb-8 max-w-lg text-center text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!
              </p>
              <a href="#" className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-pink-300 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]">
                <span>Learn more</span>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4" style={{ height: '500px', background: 'black', color: 'white' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-4xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <h3 className="mb-6 text-center text-4xl font-semibold md:text-6xl">Use your existing tools</h3>
              <p className="mb-8 max-w-lg text-center text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!
              </p>
              <a href="#" className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-red-300 shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_white]">
                <span>Learn more</span>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4" style={{ height: '500px', background: 'white', color: 'black' }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-4xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <h3 className="mb-6 text-center text-4xl font-semibold md:text-6xl">Customers love us</h3>
              <p className="mb-8 max-w-lg text-center text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!
              </p>
              <a href="#" className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-amber-300 shadow-[4px_4px_0px_black] hover:shadow-[8px_8px_0px_black]">
                <span>Learn more</span>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InfoPage;
