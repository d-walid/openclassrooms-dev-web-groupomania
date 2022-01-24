import React, { useContext } from 'react';

// Components
import Auth from '../components/Auth';

// Context
import { UidContext } from '../components/Context/AppContext';

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h2>Update page</h2>
      ) : (

        <div className="auth-container">
          <Auth signin={false} signup={true} />
        </div>
      )}
    </div>
  )
};

export default Profil;
