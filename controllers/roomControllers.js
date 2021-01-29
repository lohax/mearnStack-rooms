import RoomModel from '../models/roomModels.js'

export const getTest = (req, res) => {
  res.send({
    name: 'hardcoders'
  })
}

export const postTest = (req, res) => {
  // console.log(req)
  res.send(req.body)
}

export const addRoom = async (req, res) => {
  const room = new RoomModel(req.body)

  // try {  // on peut enlever le try and catch grace au helper.js
  await room.save() // save in BDD
  res.send(room)
//   } catch (err) {
//     res.status(500).send(err)
//   }
}

// Read All
export const getRooms = async (req, res) => {
  const rooms = await RoomModel.find({})
  res.send(rooms)
}

// Read One
export const getRoom = async (req, res) => {
  const room = await RoomModel.find({ _id: req.params.id })
  res.send(room)
}

// Update
export const updateRoom = async (req, res) => {
  const room = await RoomModel.findByIdAndUpdate(req.params.id, req.body)
  // param 1 = id, param 2 = par quoi on remplace
  await room.save() // save in BDD
  res.send(room)
}

// Delete
export const deleteRoom = async (req, res) => {
  const room = await RoomModel.findByIdAndDelete(req.params.id)
  if (!room) {
    res.status(404).send('Aucune chambre trouvé')
  }
  res.status(200).send()
}
