
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router'
import { useState } from 'react'
import Home from './components/Home'
import Create from './components/Create'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="Create" element={<Create/>} />
      <Route path="Login" element={<Login/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App

