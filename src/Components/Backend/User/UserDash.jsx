import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import Weather from './Weather';

const UserDash = () => {
    const {user}=useContext(AuthContext);
    return (
        <>
        <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-6">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <h2 className="text-xl font-semibold">{user?.displayName || "Admin Name"}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>
      <Weather></Weather>
            
        </>
    );
};

export default UserDash;