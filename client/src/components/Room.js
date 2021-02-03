import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
// useParams sert a recuperer l'id dans url
import RoomCard from './RoomCard'
import RoomForm from './RoomForm'

const Room = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  // console.info('tetch')
  useEffect(() => {
    const fetchData = async () => {
      // attention a avoir bien defini proxy dans package
      const data = await fetch(`/api/rooms/${id}`)
      const json = await data.json()
      // console.log('json', json)
      setRoom(json)
    }
    // Il faut l'utiliser directement apres dans cet equivalent de didmount,
    // sinon c'est de l'antipattern
    fetchData()
  }, [id]) // on passe l'id ou cas ou il change

  return room
    ? (
      <div>
        <RoomCard room={room} />
        <h2>Editer</h2>
        <RoomForm id={id} room={room} setRoom={setRoom} />
      </div>
      )
    : null
}

export default Room
