import mongoose from "mongoose"
const { Schema } = mongoose

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

export default mongoose.model('Author', authorSchema)