import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import logo from "../../src/assets/images/4.png";
import CarouselComponent from '../components/Carrousel/carrousel';

const Home = () => {
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
  const navigateInfo = () => {
    navigate('/PageInfo');
  }

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
              <a href="#about" className="nav_link active hover:text-red-400 transition duration-300 text-4xl">ABOUT CORP</a>
            </li>
            <li className="nav_item">
              <a href="#about" className="nav_link hover:text-red-400 transition duration-300 text-4xl">PRODUCTS</a>
            </li>
            <li className="nav_item">
              <a href="#skills" className="nav_link hover:text-red-400 transition duration-300 text-4xl" onClick={navigateToServices}>SERVICES</a>
            </li>
            <li className="nav_item">
              <a href="#Home" className="nav_link hover:text-red-400 transition duration-300 text-4xl">HOME</a>
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
      <header className="bg-white shadow-lg flex justify-between items-center p-0 bg-gradient-to-r from-gray-900 to-transparent z-10">
        <div className="items-center justify-center w-full border-none">
          <CarouselComponent />
        </div>
      </header>

      <main className="main">
        {/* ABOUT CORP */}
        <section id="about" className="relative bg-gray-50 min-h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute grid grid-cols-2 w-full h-full z-20 overflow-hidden">
            <div className="w-5/8 flex flex-col justify-center items-center z-20 p-8">
              <h1 className="text-7xl text-transparent text-center font-medium bg-gradient-to-r from-blue-600 via-danger-accent-300 to-orange-600 bg-clip-text">SMART SOLUTIONS SAA</h1>
              <p className="text-center mt-4 text-white text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel tincidunt turpis. Donec sit amet nisi ac magna fermentum lacinia. In hac habitasse platea dictumst.
              </p>
            </div>
            <div className="border-gradient flex ml-28 transform -skew-x-6 w-full">
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
            <div className="grid grid-cols-3 gap-3 h-full w-[115%] overflow-hidden absolute">
              <div className="imageinfo transform -skew-x-6 w-full h-full relative" onClick={navigateToServices}>
                <img
                  className='imagen object-cover h-full w-full hover:opacity-50'
                  src="https://files.oaiusercontent.com/file-rVIRxtAQIMK82TBh73eKiiOE?se=2024-06-11T15%3A36%3A45Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D4569aafc-57d5-4330-9460-3bb83fef2f1e.webp&sig=/yLeDdQFaGUiPdB/mYg8XIFIQFDxoRiEmOPOLtuBBBE%3D" alt="ServiceNav" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className='p-2 box-border shadow-sky-700 text-white shadow-md rounded-lg'>SERVICES</p>
                </div>
              </div>
              <div className="imageinfo transform -skew-x-6 w-full h-full relative">
                <img
                  className='imagen object-cover h-full w-full hover:opacity-50'
                  src="https://files.oaiusercontent.com/file-KTEyalLSfMO9YmO51AzpklQC?se=2024-06-11T15%3A14%3A57Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D0a39f9fe-d148-474c-92b6-c404ca3d9644.webp&sig=dAEOXRde/V5wojBYl/7oj6MeX5OwltJGCTo1OB06JTY%3D" alt="ProductsNav" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className='p-2 box-border shadow-sky-700 text-white shadow-md rounded-lg'>PRODUCTS</p>
                </div>
              </div>
              <div className="imageinfo transform -skew-x-6 w-full h-full relative" onClick={navigateInfo}>
                <img 
                  className='imagen object-cover h-full w-full opacity-100'
                  src="https://files.oaiusercontent.com/file-31ymCy0ndNu3DQgtv1Axc3ag?se=2024-06-11T14%3A34%3A31Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Df827a659-9ad8-4d70-9ca3-3b41c8058167.webp&sig=kenMDw5tN4AqKuhJ0tPyUDm8DbXH1QUN4nFan40Ztkc%3D" alt="InfoCorp" />
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