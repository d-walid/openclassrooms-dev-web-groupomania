import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Auth from '../components/Auth';
import { UidContext } from '../components/Context/AppContext';
import NewPostForm from '../components/Post/NewPostForm';

// Navigation
import Thread from '../components/Thread/Thread';


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
