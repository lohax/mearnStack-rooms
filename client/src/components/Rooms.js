import React, { useState, useEffect } from 'react'
import RoomCard from '../components/RoomCard'
import { Link } from 'react-router-dom'

const Rooms = () => {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // attention a avoir bien defini proxy dans package
      const data = await fetch('/api/rooms')
      const json = await data.json()
      setRooms(json)
      // console.log(json)
    }
    // Il faut l'utiliser directement apres dans cet equivalent de didmount,
    // sinon c'est de l'antipattern
    fetchData()
  }, [])

  return (
    <>
      {rooms.map(room => (
        <Link key={room._id} to={room._id}>
          <RoomCard
            room={room}
          />
        </Link>
      ))}
    </>
  )
}

export default Rooms
