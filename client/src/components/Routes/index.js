import React from 'react';

// Pages
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import NotFound from '../../pages/NotFound';

// Navigation
import Navbar from '../Navigation/Navbar';

// Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const index = () => {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profil' element={<Profil />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>

  );
};

export default index;
