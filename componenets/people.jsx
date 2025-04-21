import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../src/utensis/Axious";
import Loading from "./loading";
import Verticalcards from "./templates/Verticalcards";
import TopNav from "./templates/topnav";
import Dropdown from "./templates/Dropdown";

const People = () => {
  const navigate = useNavigate();
  const [people, setPeopleData] = useState([]);
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

  const getPeopleData = async () => {
    if (isFetching) return;
    try {
      setIsFetching(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/person/popular?page=${page}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmZiYzI1NDczZWVkOGVhNTU2MDY5NWUzNjgyZDAwNyIsIm5iZiI6MTc0NDcxNDk4Ni40NTEsInN1YiI6IjY3ZmUzY2VhN2MyOWFlNWJjM2Q5OTc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Y7TrWAseJf24IMmqkQDCze43jWFBT4pHXUP9Sgs5LI`,
          },
        }
      );
      const results = res.data.results.map((item) => ({
        ...item,
        media_type: "person",
        poster_path: item.profile_path
          ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
          : null,
      }));
      setPeopleData((prevData) => [...prevData, ...results]);
      setHasMore(res.data.results.length > 0);
    } catch (error) {
      console.error("Error fetching people data:", error);
      setPeopleData([]);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  const refreshHandler = async () => {
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    setPeopleData([]);
    await getPeopleData();
    setIsLoading(false);
  };

  useEffect(() => {
    setPeopleData([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    getPeopleData();
  }, []);

  useEffect(() => {
    getPeopleData();
  }, [page]);

  return (
    <div className="bg-[#1F1E24] w-full min-h-screen">
      <div className="w-full h-[10vh] flex items-center justify-between px-4 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-zinc-500 font-bold hover:text-zinc-400 transition-colors"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="text-2xl text-zinc-500 font-bold">People</h1>
        </div>
        <div className="flex items-center gap-4">
          <TopNav />
          <button
            onClick={refreshHandler}
            className="text-2xl text-zinc-500 font-bold hover:text-zinc-400 transition-colors"
          >
            <i className="ri-more-2-fill"></i>
          </button>
        </div>
      </div>
      <div className="p-4">
        <Verticalcards data={people} lastItemRef={lastItemRef} />
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default People;
