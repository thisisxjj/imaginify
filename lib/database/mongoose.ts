import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME

interface MongooseConnection {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  }
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn

  if (!MONGODB_URL || !MONGODB_DATABASE_NAME) {
    throw new Error('No MongoDB URL or No MongoDB Database Name provided')
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: MONGODB_DATABASE_NAME,
      bufferCommands: false,
    })

  cached.conn = await cached.promise

  return cached.conn
}
