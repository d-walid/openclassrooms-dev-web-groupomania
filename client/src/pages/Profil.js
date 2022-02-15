import React, { useContext } from 'react';

// Components
import Auth from '../components/Auth';
import UpdateProfil from '../components/Profil/UpdateProfil';

// Context
import { UidContext } from '../components/Context/AppContext';

// Styles
import { Container } from 'react-bootstrap';

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <Container fluid>
      {uid ? (
        <UpdateProfil />
      ) : (
        <Auth signin={false} signup={true} />
      )}
    </Container>
  )
};

export default Profil;
