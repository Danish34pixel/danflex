import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../src/utensis/Axious";
import Loading from "./loading";
import Verticalcards from "./templates/Verticalcards";
import TopNav from "./templates/topnav";
import Dropdown from "./templates/Dropdown";

const Movies = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [movieData, setMovieData] = useState([]);
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

  const getMovieData = async () => {
    if (isFetching) return;
    try {
      setIsFetching(true);
      const endpoint = category === "movie" ? "/movie/popular" : "/tv/popular";
      const res = await axios.get(endpoint, {
        params: {
          page: page,
        },
      });
      const results = res.data.results.map((item) => ({
        ...item,
        media_type: category,
      }));
      setMovieData((prevData) => [...prevData, ...results]);
      setHasMore(res.data.results.length > 0);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setMovieData([]);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMovieData([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    getMovieData();
  }, [category]);

  const refreshHandler = async () => {
    setMovieData([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    await getMovieData();
  };

  useEffect(() => {
    if (page > 1) {
      getMovieData();
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
          <h1 className="text-2xl text-zinc-500 font-bold">
            {category === "movie" ? "Movies" : "TV Shows"}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <TopNav />
          <Dropdown
            title="category"
            options={["movie", "tv"]}
            onSelect={setCategory}
          />
          <button
            onClick={refreshHandler}
            className="text-2xl text-zinc-500 font-bold hover:text-zinc-400 transition-colors"
          >
            <i className="ri-more-2-fill"></i>
          </button>
        </div>
      </div>
      <Verticalcards data={movieData} lastItemRef={lastItemRef} />
      {isLoading && <Loading />}
      {isFetching && !isLoading && (
        <div className="flex justify-center p-4">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Movies;
