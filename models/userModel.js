import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

// Pré Hook - Avant enregistrement Mongo
// .pre pour tout les traitements avant enregistrement bdd
UserSchema.pre('save', async function (next) { // on met function pour avoir le this dispo
  const user = this

  const hash = await bcrypt.hash(user.password, 10)

  user.password = hash

  next()
})

// Method verification de password
UserSchema.methods.isValidPassword = async function (password) {
  const user = this

  const isSame = await bcrypt.compare(password, user.password)

  return isSame // return true or false
}

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
