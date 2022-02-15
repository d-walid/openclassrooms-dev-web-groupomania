import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Actions
import { getUser } from './actions/user.actions';

// Context
import { UidContext } from './components/Context/AppContext';

// Redux
import { useDispatch } from 'react-redux';

// Routes
import Routes from './components/Routes';

// Services
import { authHeader } from './services/auth';

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = () => {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        headers: authHeader(),
        withCredentials: true
      })
        .then(res => {
          setUid(res.data.user.id);
        })
        .catch(err => console.log('Aucun token trouvé.'));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [dispatch, uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
