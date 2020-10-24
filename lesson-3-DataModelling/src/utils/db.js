import mongoose from 'mongoose'
import options from '../config'

console.log(options)

export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}
