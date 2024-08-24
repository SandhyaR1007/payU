const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_TOKEN } = require("../config");
const { authMiddleware } = require("./middleware");

const userRouter = express.Router();

const userSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstname: z.string(),
  lastname: z.string(),
});

const updatedUserSchema = z.object({
  password: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});
const signInSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

userRouter.post("/signup", async (req, res) => {
  const success = userSchema.safeParse(req.body);
  if (!success) {
    res.json({ message: "Incorrect data" });
  }

  const userExists = await User.findOne({ username: req.body.username });
  if (userExists._id) {
    res.status(403).json({ message: "User already exists" });
  } else {
    await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    const token = jwt.sign(req.body, JWT_TOKEN);
    res.status(201).json({ message: "User created successfully", token });
  }
});

userRouter.use(authMiddleware);

userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const success = signInSchema.safeParse({
    username: body.username,
    password: body.password,
  });
  if (!success) {
    res.status(401).json({ message: "Invalid credentials" });
  }
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  if (user) {
    const token = jwt.sign(body, JWT_TOKEN);
    res.json(200).json({ token });
    return;
  }
  res.status(401).json({ message: "Invalid credentials" });
});

userRouter.put("/", async (req, res) => {
  const body = req.body;
  const success = updatedUserSchema.parse(body);
  if (!success) {
    res.status(411).json({ message: "Invalid creds" });
  }
  const updatedUser = await User.findOneAndUpdate({ _id: req.userId }, body);
  res.json({ message: "User updated successfully", updatedUser });
});

userRouter.put("/bulk", async (req, res) => {
  const query = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstname: { $regex: query } }, { lastname: { $regex: query } }],
  }).map((user) => ({
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    _id: user._id,
  }));
  res.status(200).json({ users });
});

module.exports = userRouter;
