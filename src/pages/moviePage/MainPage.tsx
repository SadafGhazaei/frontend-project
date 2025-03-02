import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { READ_SINGLE_MOVIE } from "../../api";
import fetchWrapper from "../../api/fetchWrapper";
import ScrollToTop from "../../components/ScrollToTop";
import Movie from "../../types/Movie";
import Header from "./Header";

const MainPage = (): React.ReactElement => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [shouldRefresh, setRefresh] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const refresh = (): void => {
    setRefresh(true);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchWrapper(`${READ_SINGLE_MOVIE}/${id}`);
        console.log(data);
        setMovie(data);
        setRefresh(false);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, shouldRefresh]);
  const DEFAULT_POSTER =
    "https://fastly.picsum.photos/id/218/200/300.jpg?hmac=S2tW-K1x-k9tZ7xyNVAdnie_NW9LJEby6GBgYpL7kfo";

  const getPosterUrl = (poster: string | undefined): string => {
    if (!poster) return DEFAULT_POSTER;
    const url = `${poster}`;
    return url;
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91ac47135?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header id={id} movie={movie} refresh={refresh} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin
              size="large"
              className="text-white"
              tip="Loading movie details..."
            />
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 items-start bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-500">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-gray-900 font-serif leading-tight">
                {movie?.name}
              </h2>
              <p className="text-lg text-gray-800 font-sans line-clamp-4">
                {movie?.description}
              </p>
              <p className="text-base text-gray-900">
                <span className="font-normal text-slate-700">{`Released Year: ${movie?.released_year}`}</span>
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={getPosterUrl(movie?.poster)}
                alt={movie?.name}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
            </div>
          </div>
        )}
      </main>

      <ScrollToTop />
    </div>
  );
};

export default MainPage;
