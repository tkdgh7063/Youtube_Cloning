import express from "express";
import {
  recordView,
  createComment,
  deleteComment,
} from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", recordView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.post(
  "/videos/:id([0-9a-f]{24})/comment/:commentId/delete",
  deleteComment
);

export default apiRouter;
