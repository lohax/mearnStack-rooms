import React from 'react'
import LCLayout from './components/Layout'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import RoomsPages from './pages/RoomsPages'
import RoomForm from './components/RoomForm'

import Signup from './components/Signup'

const App = () => {
  const emptyRoom = {
    name: '',
    maxPersons: '',
    promo: false
  }
  return (
    <LCLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='rooms/*' element={<RoomsPages />} />
        <Route path='rooms/add' element={<RoomForm id='add' room={emptyRoom} />} />
        <Route path='about' element={<h1>A propos</h1>} />
        <Route path='contact' element={<h1>Contact</h1>} />
        <Route path='login' element={<h1>Login</h1>} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<h1>404 - Not Found !</h1>} />
      </Routes>
    </LCLayout>
  )
}

export default App
