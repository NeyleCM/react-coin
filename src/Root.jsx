import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <header>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
        </nav>
      </header>
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Root;