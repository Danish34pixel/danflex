import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "../componenets/Dashboard";
import Trending from "../componenets/trending";
import Popular from "../componenets/popular";
import Toprated from "../componenets/Toprated";
import Upcoming from "../componenets/Upcoming";
import People from "../componenets/people";
import TvShows from "../componenets/Tv-shows";
import Movies from "../componenets/movie";
import MovieDetails from "../componenets/movieDetails";
import TvDetails from "../componenets/tvDetails";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#1F1E24]">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<Toprated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/details/:id" element={<MovieDetails />} />
        <Route path="/people" element={<People />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/tv-shows/:id" element={<TvDetails />} />
      </Routes>
    </div>
  );
}
