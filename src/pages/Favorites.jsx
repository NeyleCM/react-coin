import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Estado para almacenar las criptomonedas favoritas
  const [coins, setCoins] = useState([]); // Estado para almacenar los datos de las criptomonedas favoritas
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // Obtenemos los favoritos del localStorage
    setFavorites(savedFavorites);

    const fetchFavoriteCoins = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        const data = await response.json();

        // Filtramos las criptomonedas para mostrar solo las favoritas
        const favoriteCoins = data.data.filter((coin) => savedFavorites.includes(coin.id));
        setCoins(favoriteCoins);
      } catch (error) {
        console.error('Error fetching favorite coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCoins();
  }, []);

  if (loading) return <div className="spinner"></div>;
  if (favorites.length === 0) return <p>No favorites added</p>;

  return (
    <div>
      <h1>Favorite Cryptocurrencies</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>{coin.name}</Link> - ${parseFloat(coin.priceUsd).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;