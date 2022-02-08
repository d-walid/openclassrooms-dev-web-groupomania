import React, { useContext } from 'react';
import Auth from '../components/Auth';
import { UidContext } from '../components/Context/AppContext';
import NewPostForm from '../components/Post/NewPostForm';

// Navigation
import Thread from '../components/Thread/Thread';


const Home = () => {
  const uid = useContext(UidContext);
  return (
    <>
      <div className="home-page">
        {uid ? <NewPostForm /> : <Auth signin={true} signup={false} />}
        <Thread />
      </div>
      <div className='home-header'>

      </div>
    </>
  );
};

export default Home;
