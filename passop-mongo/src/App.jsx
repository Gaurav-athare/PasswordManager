import { useState } from 'react'
import React from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Manager from './component/Manager'

function App() {

  return (
    <>
      <Navbar/>
      <div className='min-h-[650px]'>
      <Manager/>
      </div>
      <Footer/>
    </>
  )
}

export default App
