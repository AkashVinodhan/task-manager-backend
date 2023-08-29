const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Task = require("../models/taskModel");

//util functions

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptedPassword);
};

// generate jwt token
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//*LOGIN

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    if (await comparePassword(password, user.password)) {
      const token = genToken(user._id);

      //save token in DB
      user.token = token;
      const updatedUser = await user.save();

      //save token as cookie in client
      res.cookie("jwt", updatedUser.token, {
        maxAge: 3600000000,
        httpOnly: true,
        secure: false,
      });

      res.send({ message: "logged in", currentUser: updatedUser.name });
    } else {
      res.status(400).send({ message: "Incorrect Password" });
    }
  }
  if (!user) {
    res.status(400).send("User not found");
  }
};

//*SIGNUP

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, name } = req.body;

  const userExists = await User.findOne({ email });

  //check if user already in DB
  if (userExists) {
    res.status(400).send({ message: "Mail id already exists" });
  }

  //create new user if not
  const user = await User.create({
    name,
    email,
    username,
    password: await hashPassword(password),
  });
  //create empty task entry for the user
  const task = await Task.create({
    active: [],
    completed: [],
    user: user._id,
  });
  //if successfully created
  if (user) {
    const token = genToken(user._id);
    //save token in DB
    user.token = token;
    const updatedUser = await user.save();

    //save token as cookie in client
    res.cookie("jwt", updatedUser.token, {
      maxAge: 3600000000,
      httpOnly: true,
      secure: false,
    });
    res.status(201).send({
      currentUser: updatedUser.name,
      message: "New account created",
    });
  } else {
    res.status(400).send({ messsage: "Signup failed!" });
  }
});

const logoutUser = (req, res) => {
  try {
    res.clearCookie("jwt");
    console.log("logged out");
    res.status(200).send("Logout successfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginUser, registerUser, logoutUser };
