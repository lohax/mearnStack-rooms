import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // efface les espace en fin de string
    lowercase: true
  },
  maxPersons: {
    type: Number,
    default: 1,
    validate: value => {
      if (value <= 0) {
        throw new Error('La chambre doit pouvoir acceuillir au moins une personne.')
      }
    }
  },
  promo: {
    type: Boolean,
    trim: true//, // efface les espace en fin de string
    // uppercase: true
  }
  // ,
  // image: {
  //   data: Buffer,
  //   contentType: String
  // }

})

const RoomModel = mongoose.model('Room', RoomSchema)

export default RoomModel
