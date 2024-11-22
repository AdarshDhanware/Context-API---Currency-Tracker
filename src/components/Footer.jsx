import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='text-center py-5'>
        <hr className="my-6 border-white sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center dark:text-white">© 2024 <Link to='/' className="hover:underline">CurrencyTracker™</Link>. All Rights Reserved.</span>
      </div>
    </>
  )
}

export default Footer