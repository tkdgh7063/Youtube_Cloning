import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const ImageUploader = multerS3({
  s3: s3,
  bucket: "youtube-z68bd",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `images/`);
  },
});

const VideoUploader = multerS3({
  s3: s3,
  bucket: "youtube-z68bd",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `videos/`);
  },
});

const isHeroku = process.env.NODE_ENV === "production";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Youtube-Clone";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const uploadAvatar = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: "3145728" }, // 3MB limits
  storage: isHeroku ? ImageUploader : undefined,
});

export const uploadVideo = multer({
  dest: "uploads/videos/",
  limits: { fileSize: "104857600" }, // 100MB limits
  storage: isHeroku ? VideoUploader : undefined,
});
