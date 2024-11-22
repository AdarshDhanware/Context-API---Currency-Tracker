import React, { useContext, useState } from 'react'
import logo from '../assets/pngegg.png'
import { Link, NavLink } from 'react-router-dom'
import hamburger from '../assets/menu.png'
import { CoinContext } from '../context/CoinContext'
function Navbar() {
    const { setCurrency } = useContext(CoinContext);

    const currencyHandler = (e) => {
        switch (e.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" })
                break;
            }
            case "eur": {
                setCurrency({ name: "eur", symbol: "€" })
                break;
            }
            case "inr": {
                setCurrency({ name: "inr", symbol: "₹" })
                break;
            }

            default: {
                setCurrency({ name: "usd", symbol: "$" })
                break;
            }
        }
    }


    const [ham, setHam] = useState(false);
    const menu = () => {
        setHam((prev) => !prev)
    }
    return (
        <>
            <div className=' sticky top-0'>
                <div className='w-full px-10 flex justify-between items-center bg-black/30'>
                    <Link
                        to='/'
                        className='max-h-14 flex justify-center items-center py-2'
                    >
                        <img className=' aspect-square w-10 invert' src={logo} alt="" />
                        <h1 className='text-white text-sm font-popins'>Currency <br /> Tracker</h1>
                    </Link>

                    <div
                        className=' text-white hidden lg:flex gap-10'
                    >
                        <Link to='/'>Home</Link>
                        <Link to='/feature'>Feature</Link>
                        <div className='cursor-pointer'>Blog</div>
                        <div className='cursor-pointer'>About</div>
                    </div>

                    <div
                        className='hidden lg:block'
                    >
                        <select onChange={currencyHandler} className='outline-none rounded-lg px-1 border'>
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="inr">INR</option>
                        </select>
                    </div>

                    <div
                        className='lg:hidden'
                    >
                        <img onClick={menu} className=' aspect-square w-5 sm:w-8 invert' src={hamburger} alt="" />
                    </div>
                </div>
                <div
                    className={`absolute py-5 w-full flex items-center justify-center flex-col gap-3 bg-black ${ham ? `block` : `hidden`} lg:hidden`}
                >
                    <Link to='/' className='text-white'>Home</Link>
                    <Link to='/feature' className='text-white'>Feature</Link>
                    <div className='text-white'>Blog</div>
                    <div className='text-white'>About us</div>
                    <span>
                        <select className='outline-none rounded-lg px-1 border'>
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="inr">INR</option>
                        </select>
                    </span>
                </div>

            </div>
        </>
    )
}

export default Navbar