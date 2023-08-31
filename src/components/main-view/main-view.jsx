import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

const apiUrl = 'https://spencer-flix-20b125b2fb9e.herokuapp.com/movies';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiUrl}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            Id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Genre: movie.Genre,
            Director: movie.Director,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <Fragment>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </Fragment>
            }
          />
          <Route
            path="/login"
            element={
              <Fragment>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </Fragment>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <Fragment>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movie={selectedMovie}
                      onBackClick={() => setSelectedMovie(null)}
                    />
                  </Col>
                )}
              </Fragment>
            }
          />
          <Route
            path="/"
            element={
              <Fragment>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  <Fragment>
                    {movies.map((movie) => (
                      <Col key={movie.Id} md={3} className="mb-5">
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                    <Button
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button>
                  </Fragment>
                )}
              </Fragment>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};