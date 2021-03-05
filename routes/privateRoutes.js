import express from 'express'
import { catchErrors } from '../helpers.js'
import {
  addRoom,
  deleteRoom,
  updateRoom
} from '../controllers/roomControllers.js'

const router = express.Router()

router.post('/api/rooms', catchErrors(addRoom))

router.patch('/api/rooms/:id', catchErrors(updateRoom))

router.delete('/api/rooms/:id', catchErrors(deleteRoom))

router.get('/secret', (req, res) => {
  res.json({
    message: 'Connecté aux routes secrètes',
    user: req.user,
    token: req.query.token
  })
})

export default router
