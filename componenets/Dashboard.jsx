import React, { useState, useEffect } from "react";
import Sidenav from "./templates/Sidenav";
import axios from "../src/utensis/Axious";
import Header from "./templates/Header";
import HorizontalCards from "./templates/horinzontallCards";
import Loading from "./loading";
import Navtop from "./templates/Navtop";

const Dashboard = () => {
  document.title = "Dashboard";
  const [wallpaper, setWallpaper] = useState(null);
  const [trendingData, setTrendingData] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [isSideNavOpen, setIsSideNavOpen] = useState(!isMobile);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSideNavOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getWallpaper = async () => {
    try {
      setIsLoading(true);
      const [trendingRes, topRatedRes, popularRes, upcomingRes] =
        await Promise.all([
          axios.get("https://api.themoviedb.org/3/trending/all/day", {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmZiYzI1NDczZWVkOGVhNTU2MDY5NWUzNjgyZDAwNyIsIm5iZiI6MTc0NDcxNDk4Ni40NTEsInN1YiI6IjY3ZmUzY2VhN2MyOWFlNWJjM2Q5OTc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Y7TrWAseJf24IMmqkQDCze43jWFBT4pHXUP9Sgs5LI`,
            },
          }),
          axios.get("https://api.themoviedb.org/3/movie/top_rated", {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmZiYzI1NDczZWVkOGVhNTU2MDY5NWUzNjgyZDAwNyIsIm5iZiI6MTc0NDcxNDk4Ni40NTEsInN1YiI6IjY3ZmUzY2VhN2MyOWFlNWJjM2Q5OTc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Y7TrWAseJf24IMmqkQDCze43jWFBT4pHXUP9Sgs5LI`,
            },
          }),
          axios.get("https://api.themoviedb.org/3/movie/popular", {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmZiYzI1NDczZWVkOGVhNTU2MDY5NWUzNjgyZDAwNyIsIm5iZiI6MTc0NDcxNDk4Ni40NTEsInN1YiI6IjY3ZmUzY2VhN2MyOWFlNWJjM2Q5OTc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Y7TrWAseJf24IMmqkQDCze43jWFBT4pHXUP9Sgs5LI`,
            },
          }),
          axios.get("https://api.themoviedb.org/3/movie/upcoming", {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmZiYzI1NDczZWVkOGVhNTU2MDY5NWUzNjgyZDAwNyIsIm5iZiI6MTc0NDcxNDk4Ni40NTEsInN1YiI6IjY3ZmUzY2VhN2MyOWFlNWJjM2Q5OTc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Y7TrWAseJf24IMmqkQDCze43jWFBT4pHXUP9Sgs5LI`,
            },
          }),
        ]);

      const randomdata =
        trendingRes.data.results[
          Math.floor(Math.random() * trendingRes.data.results.length)
        ];
      setWallpaper(randomdata);
      setTrendingData(trendingRes.data.results);
      setTopRatedMovies(topRatedRes.data.results);
      setPopularMovies(popularRes.data.results);
      setUpcomingMovies(upcomingRes.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setWallpaper(null);
      setTrendingData([]);
      setTopRatedMovies([]);
      setPopularMovies([]);
      setUpcomingMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWallpaper();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen bg-[#1F1E24] overflow-x-hidden">
      <div
        className={`fixed h-full z-50 transition-transform duration-300 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidenav isOpen={isSideNavOpen} setIsOpen={setIsSideNavOpen} />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          isSideNavOpen ? "ml-[240px]" : "ml-0"
        } ${isMobile ? "mt-16" : ""}`}
      >
        <Navtop
          setIsSideNavOpen={setIsSideNavOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
        <Header data={wallpaper} />
        <div className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">
              Trending Now
            </h2>
            <HorizontalCards data={trendingData} />
          </div>
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">
              Top Rated Movies
            </h2>
            <HorizontalCards data={topRatedMovies} />
          </div>
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">
              Popular Movies
            </h2>
            <HorizontalCards data={popularMovies} />
          </div>
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">
              Upcoming Movies
            </h2>
            <HorizontalCards data={upcomingMovies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
