import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// Context
import { UidContext } from '../Context/AppContext';

// Styles
import { Nav } from 'react-bootstrap';

// Components
import Logout from '../Auth/Logout';

// Redux
import { useSelector } from 'react-redux';

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);


  return (
    <Nav className='justify-content-end'>
      <Nav.Item>
        <NavLink to='/' className='nav-link'>
          <h6>Accueil</h6>
        </NavLink>
      </Nav.Item>
      {uid ? (
        <>
          <Nav.Item>
            <NavLink to='/profil' className='nav-link'>
              <h6>Bienvenue {userData.username}</h6>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <Logout />
          </Nav.Item>
        </>
      ) : (
        <Nav.Item>
          <NavLink to='/profil' className='nav-link'>
            <h6>Inscription/Connexion</h6>
          </NavLink>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Navbar;
