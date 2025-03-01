import React from "react";
import Movie from "../../types/Movie";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { POSTER_URL } from "../../api";

const DEFAULT_POSTER =
  "https://fastly.picsum.photos/id/218/200/300.jpg?hmac=S2tW-K1x-k9tZ7xyNVAdnie_NW9LJEby6GBgYpL7kfo";
type Props = {
  movies: Array<Movie> | undefined;
};
const getPosterUrl = (poster: string | undefined): string => {
  if (!poster) return DEFAULT_POSTER;
  const url = `${poster}`;
  return url;
};
const MovieTable = ({ movies }: Props): React.ReactElement => {
  return (
    <Table
      dataSource={movies}
      className="bg-color backdrop-blur-sm"
      columns={[
        {
          title: "",
          dataIndex: "poster",
          key: "poster",
          render: function posterRenderer(
            poster: string,
            record: Movie
          ): React.ReactNode {
            return (
              <img
                className="w-20 h-auto"
                alt={record.name}
                src={getPosterUrl(poster)}
              />
            );
          },
          width: "80px",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: function nameRenderer(
            name: string,
            record: Movie
          ): React.ReactNode {
            return (
              <Link
                to={`/movies/${record.id}`}
                className="font-bold text-gray-800"
              >
                {name}
              </Link>
            );
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Released Year",
          dataIndex: "released_year",
          key: "released_year",
          sorter: (a, b) => a.released_year - b.released_year,
          render: (year: number): React.ReactNode => (
            <>{year}</>
          ),
        },
      ]}
      pagination={false}
    />
  );
};

export default MovieTable;
