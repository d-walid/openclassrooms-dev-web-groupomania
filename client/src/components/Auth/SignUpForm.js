import React, { useState } from 'react';
import axios from 'axios';

// Components
import SignInForm from './SignInForm';

// Styles
import { Form, Button } from 'react-bootstrap';

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async event => {
    event.preventDefault();

    const emailError = document.querySelector('.email.error');
    const usernameError = document.querySelector('.username-error');
    const passwordError = document.querySelector('.password-error');

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/register`,
      withCredentials: true,
      data: {
        username,
        email,
        password
      }
    })
      .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          emailError.textContent = res.data.error;
        } else {
          setFormSubmit(true);
        }
      })
      .catch(err => {
        if (err.response.status === 400)
          emailError.textContent = err.response.data.error;
      });
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4>Bienvenue chez Groupomania !</h4>
        </>
      ) : (
        <Form onSubmit={handleRegister}>
          <Form.Group className='mb-3' controlId='formBasicUsername'>
            <Form.Label>Prénom et nom</Form.Label>
            <Form.Control
              type='text'
              placeholder='Prénom et nom'
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type='password'
              placeholder='Mot de passe'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </Form.Group>

          <div className='email error'></div>
          <Button variant='primary' type='submit'>
            Inscription
          </Button>
        </Form>
      )}
    </>
  );
};

export default SignUpForm;
