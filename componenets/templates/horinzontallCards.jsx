import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovie } from "../../src/actions/movieAction";

const HorizontalCards = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredData =
    data?.filter((item) => {
      if (filter === "all") return true;
      if (filter === "movie") return item.media_type === "movie";
      if (filter === "tv") return item.media_type === "tv";
      if (filter === "person") return item.media_type === "person";
      return true;
    }) || [];

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "popularity") return b.popularity - a.popularity;
    if (sortBy === "date") {
      const dateA = new Date(a.release_date || a.first_air_date || 0);
      const dateB = new Date(b.release_date || b.first_air_date || 0);
      return dateB - dateA;
    }
    if (sortBy === "vote") return b.vote_average - a.vote_average;
    return 0;
  });

  const handleCardClick = async (item) => {
    try {
      await dispatch(getMovie(item.id));
      navigate(`/details/${item.id}`);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-3 rounded-lg w-full sm:w-auto"
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
          <option value="person">People</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-3 rounded-lg w-full sm:w-auto"
        >
          <option value="popularity">Popularity</option>
          <option value="date">Release Date</option>
          <option value="vote">Average Votes</option>
        </select>
      </div>
      <div className="w-full h-full flex overflow-x-auto gap-4 p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {sortedData.map((item) => (
          <div
            key={item.id}
            className="w-[150px] sm:w-[200px] h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg flex-shrink-0 hover:scale-105 sm:hover:scale-110 transition-all duration-300 bg-zinc-800 relative group cursor-pointer"
            onClick={() => handleCardClick(item)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-[180px] sm:h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x750?text=No+Image";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                <h3 className="text-white text-sm sm:text-base font-semibold mb-1 line-clamp-2">
                  {item?.title || item?.name || item?.original_title}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-zinc-300 text-[10px] sm:text-xs">
                    {item?.release_date || item?.first_air_date}
                  </p>
                  <p className="text-yellow-400 text-[10px] sm:text-xs">
                    <i className="ri-star-fill mr-1"></i>
                    {item?.vote_average?.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
