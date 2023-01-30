import express from "express";

const videoRouter = express.Router();
const handleWatch = (req, res) => res.send("Watch Video");
videoRouter.get("/watch", handleWatch);

export default videoRouter;
