import Mongoose from "mongoose";

export const connectDB = (url) => {
  return Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
