import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../src/utensis/Axious";
import Loading from "./loading";
import Verticalcards from "./templates/Verticalcards";
import { useDispatch } from "react-redux";
import { getMovie } from "../src/actions/movieAction";

const Trending = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  const [trending, setTrending] = useState("day");
  const [trendingData, setTrendingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, isFetching]
  );

  const getTrendingData = async () => {
    if (isFetching) return;
    try {
      setIsFetching(true);
      const res = await axios.get(`/trending/${category}/${trending}`, {
        params: {
          page: page,
        },
      });
      const results = res.data.results.map((item) => ({
        ...item,
        media_type: category,
      }));
      setTrendingData((prevData) => [...prevData, ...results]);
      setHasMore(res.data.results.length > 0);
    } catch (error) {
      console.error("Error fetching trending data:", error);
      setTrendingData([]);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  const handleCardClick = async (item) => {
    try {
      await dispatch(getMovie(item.id));
      navigate(`/details/${item.id}`);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    setTrendingData([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    getTrendingData();
  }, [category, trending]);

  const refreshHandler = async () => {
    setTrendingData([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    await getTrendingData();
  };

  useEffect(() => {
    if (page > 1) {
      getTrendingData();
    }
  }, [page]);

  return (
    <div className="bg-[#1F1E24] w-full">
      <div className="w-full h-[10vh] flex items-center justify-between px-4 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-zinc-500 font-bold hover:text-zinc-400 transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="text-2xl text-zinc-500 font-bold">Trending</h1>
        </div>
        <div className="flex items-center gap-4">
          <TopNav />
          <Dropdown
            title="category"
            options={["movie", "tv"]}
            onSelect={setCategory}
          />
          <Dropdown
            title="time"
            options={["day", "week"]}
            onSelect={setTrending}
          />
          <button
            onClick={refreshHandler}
            className="text-2xl text-zinc-500 font-bold hover:text-zinc-400 transition-colors"
          >
            <i className="ri-more-2-fill"></i>
          </button>
        </div>
      </div>
      <Verticalcards
        data={trendingData}
        lastItemRef={lastItemRef}
        onCardClick={handleCardClick}
      />
      {isLoading && <Loading />}
      {isFetching && !isLoading && (
        <div className="flex justify-center p-4">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Trending;
