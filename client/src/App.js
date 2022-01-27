import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Context
import { UidContext } from './components/Context/AppContext';

// Routes
import Routes from './components/Routes';

// Actions
import { getUser } from './actions/user.actions';

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data.user.id);
        })
        .catch((err) => console.log(err));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]);

  
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
