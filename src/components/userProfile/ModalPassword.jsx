import React, { useState } from 'react';

const EditProfileModal = ({ show, onClose, onSave }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  if (!show) {
    return null;
  }

  const handleSave = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError('');
    onSave({ password, image });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="mb-4 p-2 rounded text-red-700 bg-red-100">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Profile Image</label>
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded mr-2">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
