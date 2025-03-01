import React from "react";
import Update from "./Update";
import Delete from "./Delete";
import Movie from "../../types/Movie";

const Header = ({
  id,
  movie,
  refresh,
}: {
  id: string | undefined;
  movie: Movie | undefined;
  refresh: () => void;
}): React.ReactElement => {
  const isadmin = localStorage.getItem("isadmin");
  console.log(isadmin);
  return (
    <div className="flex justify-end mb-4">
      <div className="flex flex-row items-center">
        <Update
          initialData={{
            id: id || "",
            name: movie ? movie.name : "",
            description: movie ? movie.description : "",
            released_year: movie ? movie.released_year : -1,
            poster: movie ? movie.poster : "",
          }}
          refresh={refresh}
        />
        {isadmin === "true" && <Delete id={id} name={movie?.name} />}
      </div>
    </div>
  );
};

export default Header;
