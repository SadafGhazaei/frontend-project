import React from 'react';
import { Card } from 'antd';

type Props = {
  id: number;
  className?: string | undefined;
  alt: string;
  poster: string;
  title: string;
  released_year: number;
};

const MovieCard = ({
  id,
  className,
  alt,
  poster,
  title,
  released_year,
}: Props): React.ReactElement => {
  const { Meta } = Card;
  return (
    <Card
      key={id}
      hoverable
      className={className}
      cover={<img alt={alt} src={poster} className="w-full h-full" />}
    >
      <Meta
        title={
          <p className="text-2xl font-bold truncate text-shadow-md">{title}</p>
        }
        description={
          <p className="font-bold text-gray-500 text-md">
            <span className="font-normal text-gray-400 text-md max-h-545">
              Released year:{`${released_year}`}
            </span>
           
          </p>
        }
      />
    </Card>
  );
};

export default MovieCard;
