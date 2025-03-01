import React, { useEffect, useState } from "react";
import CardList from "./CardList";
import Header from "./Header";
import MovieTable from "./Table";
import Movie from "../../types/Movie";
import { getFilteredURL, getParams } from "./utils";
import ScrollToTop from "../../components/ScrollToTop";
import { Spin } from "antd";
import fetchWrapper from "../../api/fetchWrapper";

const MainPage = (): React.ReactElement => {
  const [isTableView, setIsTableView] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [releasedYearValue, setReleasedYearValue] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = getFilteredURL(searchValue, releasedYearValue);
        const params = getParams(searchValue, releasedYearValue);

        const queryParams = new URLSearchParams(
          params as Record<string, string>
        ).toString();

        const response = await fetchWrapper(`${url}?${queryParams}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMovies(response);
      } catch (error) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [releasedYearValue, searchValue]);

  return (
    <div className="mt-6 bg-white bg-opacity-10 p-4 rounded-lg">
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        releasedYearValue={releasedYearValue}
        setReleasedYearValue={setReleasedYearValue}
        isTableView={isTableView}
        setIsTableView={setIsTableView}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="mt-6">
          {isTableView ? (
            <MovieTable movies={movies} />
          ) : (
            <CardList movies={movies} />
          )}
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default MainPage;
