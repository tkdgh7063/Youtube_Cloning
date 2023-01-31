export const watch = (req, res) => {
  console.log(`${req.params.id}`);
  return res.send("Watch");
};
export const edit = (req, res) => {
  return res.send("Edit");
};
export const trending = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Video Delete");
};
