import express from "express";
import {
  getEdit,
  postEdit,
  remove,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
  startTwitterLogin,
  finishTwitterLogin,
} from "../controller/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/delete", remove);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/kakao/start", publicOnlyMiddleware, startKakaoLogin);
userRouter.get("/kakao/finish", publicOnlyMiddleware, finishKakaoLogin);
userRouter.get("/twitter/start", publicOnlyMiddleware, startTwitterLogin);
userRouter.get("/twitter/finish", publicOnlyMiddleware, finishTwitterLogin);

export default userRouter;
