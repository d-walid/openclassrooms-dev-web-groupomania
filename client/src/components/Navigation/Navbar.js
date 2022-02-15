import React, { useContext } from 'react';

// Components
import Logout from '../Auth/Logout';

// Context
import { UidContext } from '../Context/AppContext';

// Redux
import { useSelector } from 'react-redux';

// Router
import { NavLink } from 'react-router-dom';

// Styles
import { Image, Nav } from 'react-bootstrap';


const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <Nav className='justify-content-end'>

      <Nav.Item>
        <Image
          fluid
          src='./img/icons-groupomania/logo-groupomania-left-red.png'
          width={175}
          alt='Groupomania logo'
        />
      </Nav.Item>

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
