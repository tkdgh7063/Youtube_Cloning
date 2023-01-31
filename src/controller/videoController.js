export const trending = (req, res) => {
  const videos = [
    {
      title: "탑건: 매버릭",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "클라우스",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 2,
    },
    {
      title: "그린 북",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 3,
    },
    {
      title: "원더",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 4,
    },
    {
      title: "덕구",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 5,
    },
    {
      title: "클래식",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 6,
    },
    {
      title: "나 홀로 집에",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 7,
    },
  ];
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) =>
  res.render("watch", { pageTitle: "Watch Video" });
export const edit = (req, res) =>
  res.render("edit", { pageTitle: "Edit Video" });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Video Delete");
};
