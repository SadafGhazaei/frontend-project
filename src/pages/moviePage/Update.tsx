import React from "react";
import MovieForm from "../../components/MovieForm";
import { UPDATE_MOVIE } from "../../api";

interface UpdateProps {
  initialData: {
    id: string;
    name: string;
    description: string;
    released_year: number;
    poster: string;
  };
  refresh: () => void;
}

const Update = ({ initialData, refresh }: UpdateProps): React.ReactElement => {
  return (
    <MovieForm
      title="Edit Movie"
      apiURL={`${UPDATE_MOVIE}/${initialData.id}`}
      id={initialData.id}
      initialFormData={{
        name: initialData.name,
        description: initialData.description,
        released_year: initialData.released_year,
      }}
      refresh={refresh}
      isEdit={true}
    />
  );
};

export default Update;