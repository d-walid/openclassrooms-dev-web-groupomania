import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';

// Components
import Auth from '../components/Auth';

// Context
import { UidContext } from '../components/Context/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';

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
