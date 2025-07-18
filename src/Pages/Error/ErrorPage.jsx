import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../../../public/traveller.json"; 
const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-purple-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="text-center bg-white shadow-2xl rounded-3xl p-10 max-w-xl">
        <div className="w-72 mx-auto">
          <Lottie animationData={errorAnimation} loop={true} />
        </div>
        <h1 className="text-4xl font-extrabold text-indigo-600 mt-4">Oops! Page Not Found</h1>
        <p className="text-gray-600 mt-2 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="inline-block">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 shadow-md">
            ⬅ Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
