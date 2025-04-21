import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
      <div
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute z-0 inset-0 w-full h-full"
      ></div>
      <div className="absolute inset-0 flex items-end">
        <div
          className={`w-full text-[#6656CD] bg-gradient-to-r from-black/50 via-white/50 to-black/50 p-4 md:p-8 backdrop-blur-sm transition-all duration-500 transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <h1 className="text-2xl md:text-5xl font-bold font-['Poppins']">
            {data?.title || data?.name || data?.original_title}
          </h1>
          <p className="text-sm md:text-lg font-['Inter'] mt-2">
            {data?.overview?.slice(0, 150)}...
            <Link
              to={`/details/${data?.id}`}
              className="text-blue-400 hover:underline ml-1"
            >
              more
            </Link>
          </p>
          <p className="text-sm md:text-lg font-['Inter'] mt-2">
            <i class="ri-megaphone-fill"></i>
            {data?.release_date || "No release date"}
            <br />
            <i class="ri-movie-2-fill"></i>
            {data?.media_type || "No media type"}
          </p>
          <Link
            to={`/details/${data?.id}`}
            className="text-red-400 hover:underline ml-1"
          >
            Watch trailer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
