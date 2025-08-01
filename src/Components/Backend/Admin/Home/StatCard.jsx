import React, { useEffect, useState, useContext } from "react";
import { Users, UserCheck, UserCog } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";

const StatCard = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    admins: 0,
    moderators: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/adduser");
        const allUsers = response.data || [];

        const adminCount = allUsers.filter(u => u.role === "admin").length;
        const moderatorCount = allUsers.filter(u => u.role === "member").length;
        const userCount = allUsers.filter(u => u.role === "user").length;

        setStats({
          admins: adminCount,
          moderators: moderatorCount,
          users: userCount,
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statList = [
    {
      label: "Total Admins",
      value: stats.admins,
      icon: <UserCog className="w-6 h-6" />,
    },
    {
      label: "Total Moderators",
      value: stats.moderators,
      icon: <UserCheck className="w-6 h-6" />,
    },
    {
      label: "Total Users",
      value: stats.users,
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Admin Info */}
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statList.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 transition hover:scale-105 duration-300"
          >
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCard;
