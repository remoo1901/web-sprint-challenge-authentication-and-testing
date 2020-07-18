const express = require("express");
const bcrypt = require("bcryptjs");
const Auth = require("./auth.model");
const jwt = require("jsonwebtoken");
const restrict = require("./authenticate-middleware");
//const { orWhereNotExists } = require("../database/dbConfig");

const router = require("express").Router();

//------------------
// GET users
//------------------

router.get("/users", restrict(), async (req, res, next) => {
  try {
    res.json(await Auth.find());
  } catch (err) {
    next(err);
  }
});

//------------------
// POST  Register new user
//------------------

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findBy({ username }).first();

    if (user) {
      return res.status(409).json({ message: "username is already taken" });
    }

    const newUser = await Auth.add({
      username,
      password: await bcrypt.hash(password, 10),
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

//------------------
// POST  Login
//------------------

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };

    res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET));

    res.json({
      message: ` welcome ${user.username}`,
    });
  } catch (err) {
    next(err);
  }
});

//------------------
// GET  Logout
//------------------

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.send("cookie has been eaten");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
