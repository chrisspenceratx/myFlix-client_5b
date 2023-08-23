import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return <div onClick={() => onMovieClick(movie)}>{movie.Title}</div>;
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
  onMovieClick: PropTypes.func.isRequired,
};

//testing out 3.6 pushes...and again..///