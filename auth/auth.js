import passport from 'passport'
import { Strategy } from 'passport-local'

import UserModel from '../models/userModel.js'

import JWT from 'passport-jwt'

import dotenv from 'dotenv'

const { Strategy: JWTstrategy, ExtractJwt } = JWT

dotenv.config()

passport.use(
  'signup',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password })
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'Utilisateur non trouvé' })
        }

        const validate = await user.isValidPassword(password)
        if (!validate) {
          return done(null, false, { message: 'Mot de passe incorrect' })
        }

        return done(null, user, { message: 'Connexion réussie.' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWTSECRET,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

export default passport
