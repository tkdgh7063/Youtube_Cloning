export const trending = (req, res) => res.render("home", { pageTitle: "Home" });
export const watch = (req, res) =>
  res.render("watch", { pageTitle: "Watch Video" });
export const edit = (req, res) =>
  res.render("edit", { pageTitle: "Edit Video" });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Video Delete");
};
