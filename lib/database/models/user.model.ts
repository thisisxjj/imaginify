import { Schema, model, models } from 'mongoose'

export interface IUser extends Document {
  _id: string
  clerkId: string
  email: string
  username: string
  photo: string
  firstName?: string
  lastName?: string
  planId: number
  creditBalance: number
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: Number, default: 1 },
  creditBalance: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = models?.User || model('User', UserSchema)

export default User
