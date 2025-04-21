import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovie } from "../../src/actions/movieAction";

const Verticalcards = ({ data, lastItemRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredData = data.filter((item) => {
    if (filter === "all") return true;
    if (filter === "movie") return item.media_type === "movie";
    if (filter === "tv") return item.media_type === "tv";
    if (filter === "person") return item.media_type === "person";
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "popularity") return b.popularity - a.popularity;
    if (sortBy === "date") {
      const dateA = new Date(a.release_date || a.first_air_date);
      const dateB = new Date(b.release_date || b.first_air_date);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {sortedData.map((c, i) => (
          <div
            key={i}
            ref={i === sortedData.length - 1 ? lastItemRef : null}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => handleCardClick(c)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${c.poster_path}`}
              alt={c.title || c.name || c.original_title}
              className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2 line-clamp-2">
                  {c?.title || c?.name || c?.original_title}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-zinc-300 text-xs sm:text-sm">
                    {c?.release_date || c?.first_air_date}
                  </p>
                  <p className="text-yellow-400 text-xs sm:text-sm">
                    <i className="ri-star-fill mr-1"></i>
                    {c?.vote_average?.toFixed(1)}
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

export default Verticalcards;
