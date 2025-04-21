import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, removeMovie } from "../src/actions/movieAction";
import Header from "./templates/Header";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info: movie } = useSelector((state) => state.movie);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        await dispatch(getMovie(id));
      } catch (error) {
        console.error("Error fetching movie details:", error);
        navigate("/");
      }
    };

    fetchMovie();

    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch, id, navigate]);

  if (!movie) {
    return (
      <div className="w-full min-h-screen bg-[#1F1E24] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#6656CD] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400">Loading movie details...</p>
        </div>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const socialLinks = [
    {
      condition: movie.details?.imdb_id,
      href: `https://www.imdb.com/title/${movie.details?.imdb_id}`,
      icon: "ri-film-fill",
      text: "IMDB",
      color: "hover:text-yellow-500",
    },
    {
      condition: movie.details?.homepage,
      href: movie.details?.homepage,
      icon: "ri-home-4-fill",
      text: "Official Website",
      color: "hover:text-blue-500",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#1F1E24]">
      <Header data={movie.details} />
      <div className="w-full p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300 mb-6"
          >
            <i className="ri-arrow-left-line"></i>
            Back
          </button>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Movie Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-zinc-900 rounded-lg p-6">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {movie.details?.title}
                </h1>
                <div className="flex items-center gap-4 text-zinc-400 mb-4">
                  <span>{movie.details?.release_date?.split("-")[0]}</span>
                  <span>•</span>
                  <span>{movie.details?.runtime} min</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <i className="ri-star-fill text-yellow-500"></i>
                    {movie.details?.vote_average?.toFixed(1)}
                  </span>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  {movie.details?.overview}
                </p>
                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="mt-4 flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300"
                  >
                    <i className="ri-play-circle-fill text-2xl"></i>
                    Watch Trailer
                  </button>
                )}
              </div>

              {/* Cast Section */}
              <div className="bg-zinc-900 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movie.credits?.cast?.slice(0, 4).map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                              : "https://via.placeholder.com/500x500?text=No+Image"
                          }
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white text-sm">{actor.name}</p>
                      <p className="text-zinc-400 text-xs">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              {/* Social Links */}
              <div className="bg-zinc-900 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Links</h2>
                <div className="space-y-3">
                  {socialLinks.map(
                    (link, index) =>
                      link.condition && (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 text-zinc-400 ${link.color} transition-all duration-300 p-3 rounded-lg hover:bg-zinc-800`}
                        >
                          <i className={link.icon}></i>
                          {link.text}
                        </a>
                      )
                  )}
                </div>
              </div>

              {/* Genres */}
              <div className="bg-zinc-900 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.details?.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors"
            >
              <i className="ri-close-circle-fill text-3xl"></i>
            </button>
            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
