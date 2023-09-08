import { Fragment, useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { MoviesList } from '../movies-list/movies-list';

const apiUrl = 'https://spencer-flix-c2b5a70a1e0d.herokuapp.com/';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
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

  const handleLogOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogOut} />
      <Container>
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
                        movies={movies}
                        user={user}
                        setUser={setUser}
                        token={token}
                      />
                    </Col>
                  )}
                </Fragment>
              }
            />
            <Route
              path="/profile"
              element={
                <Fragment>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <ProfileView
                      user={user}
                      token={token}
                      setUser={setUser}
                      movies={movies}
                    />
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
                  ) : (
                    <MoviesList movies={movies} user={user} />
                  )}
                </Fragment>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};