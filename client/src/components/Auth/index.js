import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

// Bootstrap
import { Container } from 'react-bootstrap';

const Auth = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (event) => {
    if (event.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (event.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  }

  return (
    <Container fluid="md">
      <Button variant='primary' id='register' onClick={handleModals}>Inscription</Button>
      <Button variant='primary' id='login' onClick={handleModals}>Connexion</Button>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </Container>

  )
};

export default Auth;
