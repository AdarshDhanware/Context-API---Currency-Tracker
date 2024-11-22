import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom'

function Feature() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (e) => {
    setInput(e.target.value)
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    })
    setDisplayCoin(coins)
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin])

  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <div className='w-80 sm:w-auto mt-10 bg-zinc-900 flex sm:gap-8 items-center justify-center flex-nowrap px-2 py-2 rounded-xl'>
          <form
            onSubmit={searchHandler}
            className='flex items-center gap-3 w-full'>
            <input
              onChange={inputHandler}
              required
              list='coinlist'
              value={input}
              className='text-md px-4 py-2 text-white w-full sm:w-72 placeholder-zinc-200 bg-transparent outline-none rounded-lg'
              type="text"
              placeholder='Search any currency' />
            <button
              className='text-md text-white px-5 py-2 rounded-lg bg-blue-600'>
              Search
            </button>
            <datalist id='coinlist'>
              {allCoin.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>
          </form>
        </div>

        {/* Table */}
        <div className='px-5 py-2'>
          {/* Table heading */}
          <div className="bg-blue-700 gap-x-10 max-w-7xl mt-1 rounded-lg text-white px-3 py-2 grid grid-cols-3 lg:grid-cols-5 text-md sm:text-lg font-semibold">
            <div className="text-center col-span-1">S.No.</div>
            <div className="text-left col-span-1">Coins</div>
            <div className="text-left col-span-1">Price</div>
            <div className="text-center col-span-1 hidden lg:block">24H Change</div>
            <div className="text-center col-span-1 hidden lg:block">Market Cap</div>
          </div>

          {/* Table rows */}
          {displayCoin.slice(0, 20).map((item, index) => (
            <Link
              to={`/coin/${item.id}`}
              key={index}
              className=" bg-zinc-950 max-w-7xl sm:h-auto mt-1 rounded-lg text-white px-3 py-2 grid grid-cols-3 gap-x-10 lg:grid-cols-5 items-center text-sm sm:text-md hover:bg-black/50 transition"
            >
              <div className="text-center col-span-1">{item.market_cap_rank}</div>
              <div className="text-left col-span-1">
                <div className='flex flex-row items-center justify-start gap-3'>
                  <img src={item.image} className="aspect-square w-7" alt={item.name} />
                  {item.name + ' - ' + item.symbol.toUpperCase()}
                </div>
              </div>
              <div className="text-left col-span-1">
                {currency.symbol} {item.current_price.toLocaleString()}
              </div>
              <div
                className={`text-center col-span-1 hidden lg:block ${Math.floor(item.price_change_percentage_24h * 100) / 100 > 0
                  ? `text-green-700`
                  : `text-red-700`
                  }`}
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </div>
              <div className="text-center col-span-1 hidden lg:block">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </div>
            </Link>
          ))}
        </div>


      </div>
    </>
  )
}

export default Feature