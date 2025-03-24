import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
})

export default mongoose.model('User', userSchema)