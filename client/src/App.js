import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Context
import { UidContext } from './components/Context/AppContext';

// Routes
import Routes from './components/Routes';

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true
      })
        .then(res => {
          console.log(res);
          setUid(res.data);
        })
        .catch((error) => console.log('No token found.'));
    }
    fetchToken();
  }, [uid])
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
};

export default App;
