const testUser = {
  username: "tkdgh",
  loggedIn: false,
};

export const trending = (req, res) =>
  res.render("home", { pageTitle: "Home", user: testUser });
export const watch = (req, res) =>
  res.render("watch", { pageTitle: "Watch Video", testUser });
export const edit = (req, res) =>
  res.render("edit", { pageTitle: "Edit Video", testUser });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Video Delete");
};
