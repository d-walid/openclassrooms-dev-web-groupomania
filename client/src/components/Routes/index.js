import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Navbar from '../Navigation/Navbar';

const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profil' element={<Profil />} />
      </Routes>
    </Router>
  );
};

export default index;
