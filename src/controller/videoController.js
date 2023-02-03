import Video from "../models/Video";

export const home = async (req, res) => {
  // Video.find({}, (error, videos) => {});
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error");
  }
};
export const watch = (req, res) => {
  const { id } = req.params; // const id = req.params.id;
  return res.render("watch", { pageTitle: `Watching: ` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing: ` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
  // here we will add a video to the videos array.
  const { title } = req.body;
  return res.redirect("/");
};
export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => {
  return res.send("Video Delete");
};
