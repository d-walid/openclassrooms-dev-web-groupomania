import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  )
};

export default index;
