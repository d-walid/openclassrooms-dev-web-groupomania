import React, { useContext } from 'react';

// Components
import Auth from '../components/Auth';
import NewPostForm from '../components/Post/NewPostForm';

// Context
import { UidContext } from '../components/Context/AppContext';

// Navigation
import Thread from '../components/Thread/Thread';

// Styles
import { Container } from 'react-bootstrap';

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>

      <Container fluid>
        {uid ? <NewPostForm /> : <Auth signin={true} signup={false} />}
        <Thread />
      </Container>

    </>
  );
};

export default Home;
