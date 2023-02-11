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

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);
userRouter.get("/twitter/start", startTwitterLogin);
userRouter.get("/twitter/finish", finishTwitterLogin);

export default userRouter;
