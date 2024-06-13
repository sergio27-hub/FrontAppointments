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
        navigate('/login'); // Redirigir al login si no hay token o userId
        return;
      }

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
          navigate('/login'); // Redirigir al login si hay un error
          return;
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
        navigate('/login'); // Redirigir al login si hay un error
      } finally {
        setLoading(false);
      }
    };

    const fetchRoles = async () => {
        const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/roles', {
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
      const response = await fetch(`http://localhost:3000/users/updatepatch/${userId}`, {
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

  if (loading) {
    return <Loader />;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Error loading user profile</div>;
  }

  return (
    <div className="Profile overflow-hidden absolute border-4 border-slate-900 w-full h-full mx-auto p-5 shadow-lg inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10">
      <EditProfileModal
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
      <div className='card-content'>
        <div className=' text-4xl flex  flex-col items-center absolute ml-2 mt-24 rounded-md bg-slate-950 px-8 py-5 font-semibold text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80'>
          <img 
            src={`http://localhost:3000${userData.image}`} 
            alt="User profile" 
            className="w-96 h-96 rounded-full mx-auto mb-8 border-4 bg-black border-gradient-profile shadow-lg"
          />
          <div className="relative inline-block group">
            <button
              className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group-hover:scale-110"
              onClick={() => setIsEditModalOpen(true)}
            >
              <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
                Edit Profile
              </span>
            </button>
            <span className="pointer-events-none absolute -inset-2 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50"></span>
          </div>
          <p className='profileUserName flex mt-4'>{userData.username}</p>
        </div>
        <div className='relative flex justify-center items-center'>
          <h2 className="profileUserName z-10 text-8xl font-semibold mb-5 text-white flex mt-8 mr-80 rounded-lg">
            <span className="rounded-md px-4 py-2 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
              User Profile
            </span>
          </h2>
            <div className='flex flex-col space-y-4 '>
                <button className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group-hover:scale-110 left-96 hover:scale-110 hover:bg-slate-950/50 hover:text-slate-50 group-active:bg-slate-950/80" onClick={() => navigate('/login')}>
                    <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
                    Logout
                    </span>
                </button>
                <button className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group-hover:scale-110 left-96 hover:scale-110 hover:bg-slate-950/50 hover:text-slate-50 group-active:bg-slate-950/80" onClick={() => navigate('/login')}>
                    <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
                    My Appointments
                    </span>
                </button>
                <button className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group-hover:scale-110 left-96 hover:scale-110 hover:bg-slate-950/50 hover:text-slate-50 group-active:bg-slate-950/80" onClick={() => navigate('/login')}>
                    <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
                        My Services
                    </span>
                </button>
                <button className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 transform group-hover:scale-110 left-96 hover:scale-110 hover:bg-slate-950/50 hover:text-slate-50 group-active:bg-slate-950/80" onClick={() => navigate('/')}>
                    <span className="block rounded-md bg-slate-950 px-4 py-2 font-semibold text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
                        Home
                    </span>
                </button>
            </div>
          <span className=' -inset-2 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50'></span>
        </div>
        <div className='max-w-4xl mx-auto mr-96 p-8 border shadow-lg text-3xl flex  flex-col items-center mt-8 rounded-md bg-slate-950 py-22 text-slate-100'>
          <div className="space-y-5">
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
