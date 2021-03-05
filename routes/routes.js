import express from 'express'
import passport from 'passport'

import jwt from 'jsonwebtoken'

import { catchErrors } from '../helpers.js'
import {
  getRooms,
  getRoom
} from '../controllers/roomControllers.js'

import dotenv from 'dotenv'

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

router.get('/api/rooms', catchErrors(getRooms))

router.get('/api/rooms/:id', catchErrors(getRoom))

// Authentification
router.post('/signup',
  passport.authenticate('signup', { session: false }), // session false car ici on veut securiser par token
  async (req, res, next) => {
    res.json({
      message: 'L\'utilisateur est bien enregistré',
      user: req.user
    })
  }
)

router.post('/login', (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error('Une erreur est survenue.')
        return next(error)
      }

      req.login(user, { session: false }, async error => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email }

        // create token a chaque login
        const token = jwt.sign({ user: body }, process.env.JWTSECRET)

        res.json({ token, body })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next) // pour auto appeler la fonction
})

// React

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

export default router
