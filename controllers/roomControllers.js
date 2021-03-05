import RoomModel from '../models/roomModel.js'
// import multer from 'multer'

// Upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpg' ||
//      file.mimetype === 'image/jpeg' ||
//      file.mimetype === 'image/png') {
//     cb(null, true)
//   } else {
//     cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false)
//   }
// }

// const upload = multer({ storage: storage, fileFilter: fileFilter })

// Read All
export const getRooms = async (_, res) => {
  const rooms = await RoomModel.find({})
  res.send(rooms)
}

// Read One
export const getRoom = async (req, res) => {
  const rooms = await RoomModel.find({ _id: req.params.id })
  res.send(rooms[0])
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

// Update
export const updateRoom = async (req, res) => {
  const room = await RoomModel.findByIdAndUpdate(req.params.id, req.body)
  // param 1 = id, param 2 = par quoi on remplace
  await room.save()
  res.send(room)
}

// Delete
export const deleteRoom = async (req, res) => {
  const room = await RoomModel.findByIdAndDelete(req.params.id)

  if (!room) res.status(404).send('Aucune chambre trouvée.')
  res.status(200).send()
}
