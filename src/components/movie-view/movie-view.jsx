import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const apiUrl = 'https://spencer-flix-c2b5a70a1e0d.herokuapp.com';

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.Id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movieId));
  }, []);

  const handleFavorite = (addToFavorite) => {
    fetch(`${apiUrl}/users/${user.Username}/movies/${movieId}`, {
      method: addToFavorite ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong');
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        setIsFavorite(addToFavorite);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <img
        src={movie.ImagePath}
        width="300"
        alt={movie.Title}
        className="my-4"
      />
      <div className="my-3">
        <strong className="me-2">Title:</strong>
        <span>{movie.Title}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Description:</strong>
        <span>{movie.Description}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Genre:</strong>
        <span>{movie.Genre.Name}</span>
      </div>
      <div className="my-3">
        <strong className="me-2">Director:</strong>
        <span>{movie.Director.Name}</span>
      </div>
      <div className="my-4">
        <Link to={`/`}>
          <Button variant="link">Back</Button>
        </Link>
        {isFavorite ? (
          <Button onClick={() => handleFavorite(false)} variant="info">
            Remove From Favorites
          </Button>
        ) : (
          <Button onClick={() => handleFavorite(true)} variant="success">
            Add To Favorites
          </Button>
        )}
      </div>
    </Fragment>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    iPath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
  }),
};