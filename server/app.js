import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { connectDB } from "./db/connect.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFoundMiddleware } from "./middleware/not-found.js";
import "express-async-errors";
import { authRouter } from "./routes/auth.js";
import { projectRouter } from "./routes/project.js";
import { authMiddleware } from "./middleware/authentication.js";
import morgan from "morgan";
import { userRouter } from "./routes/user.js";
import { sprintRouter } from "./routes/sprint.js";
import { taskRouter } from "./routes/task.js";

dotenv.config();

const port = process.env.NODE_DOCKER_PORT || 8080;
const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

// APP SETTINGS
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());
app.use(morgan("tiny"));

// ROUTES

app.get("/", (req, res) => {
  res.send('<h1>Scrum API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authMiddleware, userRouter);
app.use('/api/v1/project', authMiddleware, projectRouter);
app.use('/api/v1/sprint', authMiddleware, sprintRouter);
app.use('/api/v1/task', authMiddleware, taskRouter);


// NOT FOUND AND ERROR MIDDLEWARES
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
