import React from 'react'
import Layout from './Layout'
import Home from '../src/components/Home'
import Feature from '../src/components/Feature'
import Coin from './components/Coin'
import CoinContextProvider from './context/CoinContext'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

function App() {

  const route=createBrowserRouter((
    createRoutesFromElements(
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/feature' element={<Feature/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
      </Route>
    )
  ))

  return (
    <>
    {/* <CoinContextProvider> */}
      <RouterProvider router={route}/>
    {/* </CoinContextProvider> */}
    </>
  )
}

export default App