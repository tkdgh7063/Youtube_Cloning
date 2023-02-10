import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "cross-fetch";

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
  const user = await User.findOne({ email, socialLogin: false });
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

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const url = `${baseUrl}?${params}`;
  return res.redirect(url);
};

export const finishGithubLogin = async (req, res) => {
  // docs.github.com/en/rest/reference for more api information
  // to do list: Follow a user function add
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const url = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find((email) => email.primary && email.verified);
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      // create an account
      // 비밀번호만 생성하도록 하고 깃허브 계정과 통합?
      const user = await User.create({
        email: emailObj.email,
        username: userData.login,
        password: "secret",
        name: userData.name,
        socialLogin: true,
        avatarUrl: userData.avatar_url,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const edit = (req, res) => res.send("User Edit");

export const remove = (req, res) => res.send("User Delete");

export const logout = (req, res) => res.send("Log Out");

export const see = (req, res) => res.send("See");
