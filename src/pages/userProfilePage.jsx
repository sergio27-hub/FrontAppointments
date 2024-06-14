import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../components/userProfile/ModalPassword';
import Loader from "../components/Loader";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');

      if (!token || !userId) {
        navigate('/login');
        return;
      }

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
        console.log(data);
        setUserData(data);
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    const fetchRoles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/roles`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          console.error('Error fetching roles:', response.statusText);
          return;
        }

        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error.message);
      }
    };

    fetchUserProfile();
    fetchRoles();
  }, [navigate]);

  const getRoleNames = (roleIds) => {
    return roleIds.map((id) => {
      const role = roles.find((role) => role._id === id);
      return role ? role.name : 'Unknown';
    }).join(', ');
  };

  const handleSaveProfile = async (updatedData) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    const formData = new FormData();
    if (updatedData.password) {
      formData.append('password', updatedData.password);
    }
    if (updatedData.image) {
      formData.append('image', updatedData.image);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/updatepatch/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsEditModalOpen(false);
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('roles');
    navigate('/');
  };

  if (loading) {
    return <Loader />;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Error loading user profile</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-transparent py-10 flex flex-col items-center Profile">
      <EditProfileModal
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
      <div className="w-full flex flex-col items-center mb-8">
        <div className="md:mt-10 md:space-x-5 flex flex-col space-y-4 md:space-y-0 justify-center md:flex-row md:flex-auto md:flex ">
          <button
            className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group hover:scale-110"
            onClick={handleLogout}
          >
            <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
              Logout
            </span>
            <span className="pointer-events-none absolute inset-0 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50"></span>
          </button>
          <button
            className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group hover:scale-110"
            onClick={() => navigate('/appointments')}
          >
            <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
              My Appointments
            </span>
            <span className="pointer-events-none absolute inset-0 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50"></span>
          </button>
          <button
            className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group hover:scale-110"
            onClick={() => navigate('/services')}
          >
            <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
              My Services
            </span>
            <span className="pointer-events-none absolute inset-0 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50"></span>
          </button>
          <button
            className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group hover:scale-110"
            onClick={() => navigate('/')}
          >
            <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
              Home
            </span>
            <span className="pointer-events-none absolute inset-0 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50"></span>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row p-12 items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="bg-slate-950 rounded-md p-12 shadow-lg flex flex-col items-center space-y-8 w-96 md:w-1/3">
          <img 
            src={`${process.env.REACT_APP_BACKEND_URL}${userData.image}`} 
            alt={userData.username} 
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-contain border-4 bg-black border-gradient-profile shadow-lg transition-all duration-300 transform hover:scale-110"
          />
          <button
            className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group hover:scale-110"
            onClick={() => setIsEditModalOpen(true)}
          >
            <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
              Edit Profile
            </span>
            <span className="pointer-events-none absolute inset-0 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50"></span>
          </button>
          <p className="text-2xl md:text-5xl text-tittle-service">{userData.username}</p>
        </div>
        <div className="w-full md:w-2/3 mt-10 md:mt-0">
          <h2 className="text-4xl font-semibold text-white mb-8">User Info</h2>
          <div className="bg-slate-950 rounded-md p-8 shadow-lg space-y-5 text-white">
            <p><strong>ID:</strong> {userData._id}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Roles:</strong> {getRoleNames(userData.role)}</p>
            <p><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(userData.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
