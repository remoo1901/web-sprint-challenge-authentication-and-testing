const express = require("express");
const bcrypt = require("bcryptjs");
const Auth = require("./auth.model");
const jwt = require("jsonwebtoken");
const restrict = require("./authenticate-middleware");
const { orWhereNotExists } = require("../database/dbConfig");

const router = require("express").Router();




//------------------
// POST  Register new user
//------------------

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
  
});

module.exports = router;
