import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Root from '../Root';
import Home from '../pages/Home';
import Coin from '../pages/Coin';
import Favorites from '../pages/Favorites';

function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} /> 
        <Route path="coin/:id" element={<Coin />} />
        <Route path="favorites" element={<Favorites />} /> 
      </Route>
    </Routes>
  );
}

export default RoutesConfig;