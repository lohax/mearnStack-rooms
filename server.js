import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import privateRoutes from './routes/privateRoutes.js'

import passport from 'passport'

import './auth/auth.js'

import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())

app.use(express.static('client/build')) // On donne le chemin des pages statics du build

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  // connectTimeoutMS: 300000
})
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch(err => {
    console.log(err)
  })

// ordre important, avant les routes
app.use(
  '/private',
  passport.authenticate('jwt', { session: false }),
  privateRoutes
)

app.use(routes)

app.listen(PORT, () => {
  console.log(`le serveur est lancé sur le port : ${PORT}`)
})
