import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [coins, setCoins] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets/');
        const data = await response.json();
        setCoins(data.data); 
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false); 
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <div className="spinner"></div>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Top Cryptocurrencies</h1>
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

export default Home;
