import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaBoxOpen, FaBlog, FaMapMarkedAlt, FaTools } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnnouncementBanner = () => {
  const [packageCount, setPackageCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [guideCount, setGuideCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [packageRes, serviceRes, blogRes, guideRes] = await Promise.all([
          axios.get("http://localhost:3000/api/packages"),
          axios.get("https://wander-lust-server-site.vercel.app/api/services"),
          axios.get("https://wander-lust-server-site.vercel.app/api/blogs"),
          axios.get("https://wander-lust-server-site.vercel.app/api/guides"),
        ]);

        setPackageCount(packageRes.data.length || 0);
        setServiceCount(serviceRes.data.length || 0);
        setBlogCount(blogRes.data.length || 0);
        setGuideCount(guideRes.data.length || 0);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching counts:", error);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const data = {
    labels: ["Packages", "Services", "Blogs", "Guides"],
    datasets: [
      {
        label: "Counts",
        data: [packageCount, serviceCount, blogCount, guideCount],
        backgroundColor: ["#a3d5ff", "#ffe0ac", "#c3aed6", "#a8e6cf"],
        hoverBackgroundColor: ["#7bbdf1", "#ffd580", "#b393d3", "#7ddfc3"],
        borderWidth: 1,
        borderColor: "#ddd",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-4 border-indigo-400 inline-block pb-1">
        📊 Platform Insights
      </h2>
      <p className="text-gray-600 mb-8">
        Overview of your platform’s active modules.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <StatCard
              icon={<FaBoxOpen className="text-blue-500 w-8 h-8" />}
              count={packageCount}
              label="Packages"
              color="blue"
            />
            <StatCard
              icon={<FaTools className="text-orange-500 w-8 h-8" />}
              count={serviceCount}
              label="Services"
              color="orange"
            />
            <StatCard
              icon={<FaBlog className="text-purple-500 w-8 h-8" />}
              count={blogCount}
              label="Blogs"
              color="purple"
            />
            <StatCard
              icon={<FaMapMarkedAlt className="text-green-500 w-8 h-8" />}
              count={guideCount}
              label="Guides"
              color="green"
            />
          </div>

          <div className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
            <Pie data={data} />
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ icon, count, label, color }) => {
  const bgColors = {
    blue: "bg-blue-100",
    orange: "bg-orange-100",
    purple: "bg-purple-100",
    green: "bg-green-100",
  };

  const textColors = {
    blue: "text-blue-700",
    orange: "text-orange-700",
    purple: "text-purple-700",
    green: "text-green-700",
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`${bgColors[color]} rounded-full w-20 h-20 flex items-center justify-center shadow-md transform transition-transform hover:scale-110`}
      >
        {icon}
      </div>
      <p
        className={`text-4xl font-extrabold ${textColors[color]} tracking-tight`}
      >
        {count}
      </p>
      <p className="text-gray-500 uppercase tracking-wide font-semibold">
        {label}
      </p>
    </div>
  );
};

export default AnnouncementBanner;
