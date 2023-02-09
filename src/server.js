import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello!",
    resave: false, // resave session even if the session was never modified during the request
    saveUninitialized: false, // save session only when session is modified(user logged in)
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/youtube-clone",
    }),
  })
);
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
