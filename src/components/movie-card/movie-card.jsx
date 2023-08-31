import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movie.Id)}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
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