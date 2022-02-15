import React, { useState } from 'react';
import axios from 'axios';

// Styles
import { Button, Form } from 'react-bootstrap';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = event => {
    event.preventDefault();
    const emailError = document.querySelector('.email.error');

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      }
    })
      .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          emailError.textContent = res.data.error;
        } else {
          window.location = '/';
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (

    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Form.Group>

      <div className="email error"></div>

      <Button variant="primary" type="submit">
        Connexion
      </Button>
    </Form>

  );
};

export default SignInForm;
