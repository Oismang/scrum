import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import xss from "xss-clean";
import { rateLimit } from "express-rate-limit";
import { connectDB } from "./db/connect.js";
import "express-async-errors";

dotenv.config();

const app = express();

app.set('trust proxy', 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>SCRUM API</h1>');
});

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
