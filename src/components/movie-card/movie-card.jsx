import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export const MovieCard = ({ movie, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movie.Id));
  }, []);

  return (
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movie.Id)}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>
      <Card.Body>
        <Card.Title>
          {movie.Title}
          {isFavorite && (
            <div className="my-2">
              <Badge bg="info">Favorite</Badge>
            </div>
          )}
        </Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }),
};