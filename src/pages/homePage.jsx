import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import logo from "../../src/assets/images/4.png";
import CarouselComponent from '../components/Carrousel/carrousel';
import Service from '../assets/smartSolutionsIA/Service.webp';
import Product from '../assets/smartSolutionsIA/Products.webp';
import Info from '../assets/smartSolutionsIA/Info.webp';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
            navigate('/');
            return;
          }

          const data = await response.json();
          setUserData(data);

          // Fetch roles
          const rolesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/roles`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!rolesResponse.ok) {
            console.error('Error fetching roles:', rolesResponse.statusText);
            return;
          }

          const rolesData = await rolesResponse.json();
          const userRoles = data.role.map(roleId => {
            const role = rolesData.find(role => role._id === roleId);
            return role ? role.name : 'Unknown';
          }).join(', ');

          localStorage.setItem('roles', userRoles);
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          navigate('/');
        }
      }
    };

    fetchUserData();
    return () => clearTimeout(timer);
  }, [navigate]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('roles');
    setIsLoggedIn(false);
    navigate('/');
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
  const navigateToInfo = () => {
    navigate('/PageInfo');
  };

  const navigateLogin = () => {
    navigate('/login');
  };
  const navigateInfo = () => {
    navigate('/PageInfo');
  };

  const handleHomeClick = () => {
    navigate('/');
    window.location.reload();
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
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
    <div id='Home' className='w-full h-full'>
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
            <li className={`nav_link ${activeLink === 'about' ? 'active' : ''}`} onClick={() => navigateToInfo() }>
              <a href="#about" className="nav_link active hover:text-red-400 transition duration-300 text-xl md:text-4xl">ABOUT CORP</a>
            </li>
            <li className={`nav_link ${activeLink === 'products' ? 'active' : ''}`} onClick={() => handleLinkClick('products')}>
              <a href="#about" className="nav_link hover:text-red-400 transition duration-300 text-xl md:text-4xl">PRODUCTS</a>
            </li>
            <li className={`nav_link ${activeLink === 'services' ? 'active' : ''}`} onClick={() => { handleLinkClick('services'); navigateToServices(); }}>
              <a href="#skills" className="nav_link hover:text-red-400 transition duration-300 text-xl md:text-4xl">SERVICES</a>
            </li>
            <li className={`nav_link ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleHomeClick}>
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
      <header className="bg-white shadow-lg flex flex-col md:flex-row justify-between items-center p-0 bg-gradient-to-r from-gray-900 to-transparent z-10">
        <div className="w-full md:w-1/8 items-center justify-center border-none">
          <CarouselComponent />
        </div>
      </header>

      <main className="main">
        {/* ABOUT CORP */}
        <section id="about" className="relative bg-gray-50 min-h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute grid grid-cols-1 md:grid-cols-2 w-full h-full z-20 overflow-hidden">
            <div className="w-full md:w-5/8 flex flex-col justify-center items-center z-20 p-8">
              <h1 className="text-4xl md:text-7xl text-transparent text-center font-medium bg-gradient-to-r from-blue-600 via-danger-accent-300 to-orange-600 bg-clip-text">SMART SOLUTIONS SAA</h1>
              <p className="text-center mt-4 text-white text-lg">
              At Smart Solutions SA, we are dedicated to providing comprehensive and high-quality solutions in the automotive sector. We specialize in the sale of accessories and tuning services, as well as vehicle maintenance and repair. Our goal is to deliver an exceptional experience to our customers, ensuring the safety and optimal performance of their cars. With a focus on innovation, integrity, and excellence, we strive to be the top choice for car owners. Discover how we can help you enhance your vehicle today!
              </p>
            </div>
            <div className="border-gradient flex ml-0 md:ml-28 transform -skew-x-6 w-full">
              <img
                src="https://cloudfront-us-east-1.images.arcpublishing.com/copesa/O2EOSR27FNEBZERDC3ELHFJHXU.jpg"
                alt="about_corp"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        {/* LINKS */}
        <section id='LinkNAV' className="bg-slate-800 min-h-screen flex items-center">
          <div className="w-full h-full flex justify-center items-center overflow-hidden absolute border-4 border-slate-900 ">
            <div className="animate-rotate absolute inset-0 h-full w-full bg-[conic-gradient(#F78F2F_50deg,transparent_180deg)]"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full w-[115%] overflow-hidden absolute">
              <div className="imageinfo transform -skew-x-6 w-full h-full relative" onClick={navigateToServices}>
                <img
                  className='imagen object-cover h-full w-full hover:opacity-50'
                  src={Service} alt="ServiceNav" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className='p-2 box-border shadow-sky-700 text-white shadow-md rounded-lg'>SERVICES</p>
                </div>
              </div>
              <div className="imageinfo transform -skew-x-6 w-full h-full relative">
                <img
                  className='imagen object-cover h-full w-full hover:opacity-50'
                  src={Product} alt="ProductsNav" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className='p-2 box-border shadow-sky-700 text-white shadow-md rounded-lg'>PRODUCTS</p>
                </div>
              </div>
              <div className="imageinfo transform -skew-x-6 w-full h-full relative" onClick={navigateInfo}>
                <img 
                  className='imagen object-cover h-full w-full opacity-100'
                  src={Info} alt="InfoCorp" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className='p-2 box-border shadow-sky-700 text-white shadow-md rounded-lg'>CORPORATION</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>&copy; 2024 Corp. SMART SOLUTIONS SAA.</p>
      </footer>
    </div>
  );
};

export default Home;
