import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Rooms from '../components/Rooms'
import Room from '../components/Room'

const RoomsPages = () => {
  return (
    <Routes>
      <Route path='/' element={<Rooms />} />
      <Route path=':id' element={<Room />} />
    </Routes>
  )
}

export default RoomsPages
