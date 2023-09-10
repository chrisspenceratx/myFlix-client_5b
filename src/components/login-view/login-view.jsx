import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const apiUrl = 'https://spencer-flix-c2b5a70a1e0d.herokuapp.com/';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch(`${apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('Username or Password incorrect.');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
    <Form.Group controlId="formUsername" className="my-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          minLength={5}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="my-3">
                <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="my-3">
        Login
      </Button>
    </Form>
  );
};