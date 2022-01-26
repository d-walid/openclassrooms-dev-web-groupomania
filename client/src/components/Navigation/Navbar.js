import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// Context
import { UidContext } from '../Context/AppContext';

// Styles
import { Nav } from 'react-bootstrap';
import Logout from '../Auth/Logout';

const Navbar = () => {
  const uid = useContext(UidContext);

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
              <h6>Bienvenue 'valeur dynamique'</h6>
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
