/*------ CON IMÁGEN -----*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [coinImage, setCoinImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
        setCoin(response.data.data);
      } catch (error) {
        console.error('Error fetching coin:', error);
        setError('No se pudo obtener la información de la criptomoneda.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCoinImage = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoinImage(response.data.image.large);
      } catch (error) {
        console.error('No se pudo obtener la imagen de la criptomoneda', error);
      }
    };

    fetchCoin();
    fetchCoinImage();

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(savedFavorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (savedFavorites.includes(id)) {
      const newFavorites = savedFavorites.filter((favId) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      savedFavorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      setIsFavorite(true);
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <div>{error}</div>;
  if (!coin) return <p>Coin not found</p>;

  return (
    <div>
      <h1>{coin.name} ({coin.symbol})</h1>
      {coinImage ? (
        <img src={coinImage} alt={`${coin.name} logo`} style={{ width: '150px' }} />
      ) : (
        <p>Imagen no disponible</p>
      )}
      <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
      <p>Supply: {parseFloat(coin.supply).toLocaleString()}</p>
      <p>Volume (24hr): ${parseFloat(coin.volumeUsd24Hr).toLocaleString()}</p>
      <p>Change (24hr): {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
      
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default Coin;



/* ---SIN IMÁGEN-----

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [isFavorite, setIsFavorite] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
        if (!response.ok) throw new Error('Coin not found');
        
        const data = await response.json();
        setCoin(data.data); 
      } catch (error) {
        console.error('Error fetching coin:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCoin();

    // Criptomoneda está ya en favoritos?
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(savedFavorites.includes(id));
  }, [id]);

  // Añadir o quitar favoritos
  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (savedFavorites.includes(id)) {
      // Quitar de favoritos
      const newFavorites = savedFavorites.filter((favId) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // Añadir a favoritos
      savedFavorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      setIsFavorite(true); 
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (!coin) return <p>Coin not found</p>;

  return (
    <div>
      <h1>{coin.name} ({coin.symbol})</h1>
      <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
      <p>Supply: {parseFloat(coin.supply).toLocaleString()}</p>
      <p>Volume (24hr): ${parseFloat(coin.volumeUsd24Hr).toLocaleString()}</p>
      <p>Change (24hr): {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
      
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default Coin;
*/