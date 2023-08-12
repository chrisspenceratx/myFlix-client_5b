import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => (
  <React.Fragment>
    <img src={movie.ImagePath} width="300" alt={movie.Title} />
    <div>
      <span>Title: &nbsp;</span>
      <span>{movie.Title}</span>
    </div>
    <div>
      <span>Description: &nbsp;</span>
      <span>{movie.Description}</span>
    </div>
    <div>
      <span>Genre: &nbsp;</span>
      <span>{movie.Genre.Name}</span>
    </div>
    <div>
      <span>Director: &nbsp;</span>
      <span>{movie.Director.Name}</span>
    </div>
    <button onClick={onBackClick}>Back</button>
  </React.Fragment>
);

MovieView.propTypes = {
  movie: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
  }),
  onBackClick: PropTypes.func.isRequired,
};