import express from "express";
import { join, login } from "../controller/userController";
import { trending, search } from "../controller/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
