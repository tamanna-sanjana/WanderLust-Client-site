// src/components/Weather.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = "304506910a705629c1c3cf58d519386f"; // Your API key
  const CITY = "Sylhet"; // Or "Dhaka" for more specific result

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError("Failed to load weather data.");
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center  p-4">
      <div className="card bg-white shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">🌤️ Sylhet Weather</h2>

        {loading && <p className="text-center">Loading...</p>}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {weatherData && (
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">
              {weatherData.name}, {weatherData.sys.country}
            </h3>
            <p className="text-4xl font-bold">{weatherData.main.temp}°C</p>
            <p className="capitalize">{weatherData.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
