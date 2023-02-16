import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  // Video.find({}, (error, videos) => {});
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.status(400).render("server-error");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (video.owner != _id) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", {
    pageTitle: `Editing: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      users: { _id },
    },
    params: { id },
    body: { title, description, hashtags },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (video.owner != _id) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
    file: { path: videoUrl },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      videoUrl,
      description,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (video.owner != _id) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const query = req.query.q;
  let videos = [];
  if (query) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(query, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
