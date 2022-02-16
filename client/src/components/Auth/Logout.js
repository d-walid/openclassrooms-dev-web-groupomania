import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

// Styles
import { Nav } from 'react-bootstrap';

const Logout = () => {
  const removeCookie = key => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
      withCredentials: true
    })
      .then(() => removeCookie('jwt'))
      .catch(err => err);

    window.location = '/';
  };

  return (

    <>
      <Nav>
        <Nav.Item>
          <Nav.Link>
            <h6 onClick={logout}>Déconnexion</h6>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>

  );
};

export default Logout;
