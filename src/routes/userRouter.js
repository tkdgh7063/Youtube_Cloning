import express from "express";
import {
  edit,
  remove,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);

export default userRouter;
