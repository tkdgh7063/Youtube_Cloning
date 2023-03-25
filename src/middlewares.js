import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Youtube-Clone";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
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
});

export const uploadVideo = multer({
  dest: "uploads/videos/",
  limits: { fileSize: "104857600" }, // 100MB limits
});
