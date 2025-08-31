import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: true
    }
})

export const UserModel = mongoose.model('user', UserSchema)