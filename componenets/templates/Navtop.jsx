import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../src/utensis/Axious";

const Navtop = ({ setIsSideNavOpen }) => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getSearch = async () => {
    if (!query) return setSuggestions([]);
    try {
      const response = await axios.get(`/search/multi?query=${query}`);
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getSearch();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleClearQuery = () => {
    setQuery("");
    setSuggestions([]);
  };

  const getSuggestionLink = (suggestion) => {
    if (suggestion.media_type === "person") {
      return `/people/${suggestion.id}`;
    } else if (suggestion.media_type === "movie") {
      return `/details/${suggestion.id}`;
    } else {
      return `/tv-shows/${suggestion.id}`;
    }
  };

  return (
    <div className="w-full h-[10vh] flex items-center justify-between relative px-4 bg-[#1F1E24] border-b border-zinc-800">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 absolute left-[15vh] text-4xl">
        <i className="text-[#6656CD] ri-tv-fill text-2xl"></i>
        <span className="text-[#6656CD] text-xl font-bold">Danflex</span>
      </div>

      {/* Mobile Menu and Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSideNavOpen(true)}
          className="text-zinc-400 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-zinc-800"
        >
          <i className="text-xl ri-menu-line"></i>
        </button>

        <button
          onClick={() => setSearch(!search)}
          className="text-zinc-400 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-zinc-800"
        >
          <i className="text-xl ri-search-line"></i>
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {search && (
        <div className="fixed top-0 left-0 right-0 w-full bg-[#1F1E24] p-4 z-50 border-b border-zinc-800">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center bg-zinc-800 rounded-lg px-4 py-2 w-full">
              <i className="text-zinc-400 text-xl ri-search-line"></i>
              <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="w-full bg-transparent outline-none border-none text-zinc-400 ml-2"
                type="text"
                placeholder="Search movies, TV shows, people..."
              />
              {query.length > 0 && (
                <i
                  onClick={handleClearQuery}
                  className="ri-close-line text-zinc-400 cursor-pointer hover:text-white"
                ></i>
              )}
            </div>
            <button
              onClick={() => setSearch(false)}
              className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800"
            >
              <i className="text-xl ri-close-line"></i>
            </button>
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="w-full max-w-2xl max-h-[50vh] bg-zinc-800 absolute top-[10vh] overflow-y-auto scrollbar-hide rounded-lg z-50 border border-zinc-700 shadow-xl">
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion.id}
              className="w-full flex items-center gap-4 p-4 hover:bg-zinc-700 transition-all duration-300 border-b border-zinc-700 last:border-b-0"
              to={getSuggestionLink(suggestion)}
            >
              <img
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md shadow-lg"
                src={
                  suggestion.poster_path || suggestion.profile_path
                    ? `https://image.tmdb.org/t/p/w500${
                        suggestion.poster_path || suggestion.profile_path
                      }`
                    : "/public/no img.jpg"
                }
                alt={suggestion.title || suggestion.name || "title"}
              />

              <div className="flex flex-col">
                <span className="text-white font-medium text-sm sm:text-base">
                  {suggestion.title || suggestion.name}
                </span>
                <span className="text-zinc-400 text-xs sm:text-sm">
                  {suggestion.release_date || suggestion.first_air_date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navtop;
