import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("signup", { pageTitle: "Sign Up" });
};

export const postJoin = async (req, res) => {
  // 실패 시 비밀번호를 제외한 입력 사항을 복구, 틀린 사항쪽에 포커스
  const { email, username, password, password2, name, location } = req.body;
  // const exists = await User.exists({ $or: [{ username }, { email }] });
  if (password !== password2) {
    return res.status(400).render("signup", {
      pageTitle: "Sign Up",
      errorMessage: "Password confirmation does not match.",
    });
  }

  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render("signup", {
      pageTitle: "Sign Up",
      errorMessage: "This Username is already taken.",
    });
  }

  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(400).render("signup", {
      pageTitle: "Sign Up",
      errorMessage: "This Email is already taken.",
    });
  }

  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("signup", {
      pageTitle: "Sign Up",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "Wrong Email" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "Wrong Password" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const edit = (req, res) => res.send("User Edit");

export const remove = (req, res) => res.send("User Delete");

export const logout = (req, res) => res.send("Log Out");

export const see = (req, res) => res.send("See");
