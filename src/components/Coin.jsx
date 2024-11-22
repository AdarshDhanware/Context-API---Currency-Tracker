import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
import LineChart from './LineChart';

function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then(res => res.json())
      .then(res => setCoinData(res));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-Kt5q1qj6381r1BH6qcFEUphn' }
    };
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && coinData.image && historicalData) {
    return (
      <div className='px-5 text-white flex flex-col items-center justify-center gap-8'>
        <div className='mt-10 flex flex-col items-center justify-center gap-5'>
          <img className='aspect-square w-28' src={coinData.image.large} alt={`${coinData.name} logo`} />
          <p className='text-center text-4xl'>
            <b>{coinData.name} ({coinData.symbol?.toUpperCase()})</b>
          </p>
        </div>
        <div className='w-full lg:max-w-2xl'>
          <LineChart historicalData={historicalData} />
        </div>

        {/* coin info */}
        <div className='flex flex-col gap-5'> 
          <ul className='flex justify-between items-center'>
            <li className='font-bold'>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul className='flex justify-between items-center gap-5'> 
            <li className='font-bold'>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-center items-center gap-10'>
            <li className='font-bold'>Market Cap</li>
            <li className='text-left'>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between items-center gap-5'>
            <li className='font-bold'>24 Hour High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul className='flex justify-between items-center gap-5'>
            <li className='font-bold'>24 Hour Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>

      </div>
    );
  } else {
    return (
      <div className='w-screen h-screen text-center flex justify-center'>
        <div className='mt-40 aspect-square w-12 h-12 lg:w-24 lg:h-24 rounded-full text-white text-4xl border-4 animate-spin border-t-blue-600'></div>
      </div>
    );
  }
}

export default Coin;
