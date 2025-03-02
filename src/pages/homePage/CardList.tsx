import React from "react";
import Card from "../../components/Card";
import Movie from "../../types/Movie";
import { Link } from "react-router-dom";


const DEFAULT_POSTER =
  "https://fastly.picsum.photos/id/218/200/300.jpg?hmac=S2tW-K1x-k9tZ7xyNVAdnie_NW9LJEby6GBgYpL7kfo";

type Props = {
  movies?: Array<Movie>;
};

const CardList = ({ movies = [] }: Props): React.ReactElement => {
  const getPosterUrl = (poster: string | undefined): string => {
    if (!poster) return DEFAULT_POSTER;
    const url = `${poster}`;
    return url;
  };
  console.log(movies);
  return (
    <>
      <div className="grid flex-1 gap-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {movies.map((m) => (
          <Link key={m.id} to={`/movies/${m.id}`}>
            <Card
              id={m.id}
              alt={m.name}
              poster={getPosterUrl(m.poster)}
              title={m.name}
              released_year={m.released_year}
              className="rounded-md shadow-2xl backdrop-blur-sm bg-color"
            />
          </Link>
        ))}
      </div>
      {movies.length === 0 && (
        <h1 className="p-2 mt-4 text-4xl font-semibold text-center backdrop-blur-md">
          No Movie Found!
        </h1>
      )}
    </>
  );
};

export default CardList;
