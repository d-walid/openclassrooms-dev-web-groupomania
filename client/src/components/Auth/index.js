import React, { useState } from 'react';

// Components
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

// Styles
import { Container, Button } from 'react-bootstrap';

const Auth = props => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = event => {
    if (event.target.id === 'register') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (event.target.id === 'login') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <Container fluid='sm'>

      <Button
        className='mt-3 mb-3'
        variant='primary'
        id='register'
        onClick={handleModals}
      >
        Inscription
      </Button>

      <Button variant='primary' id='login' onClick={handleModals}>
        Connexion
      </Button>

      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}

    </Container>
  );
};

export default Auth;
