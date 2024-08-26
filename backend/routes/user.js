const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
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
    return res.json({ message: "Incorrect data" });
  }

  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) {
    return res.status(403).json({ message: "User already exists" });
  } else {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign({ userId: user._id }, JWT_TOKEN);
    res.status(201).json({ message: "User created successfully", token });
  }
});

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
    return res.status(200).json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
});
userRouter.use(authMiddleware);
userRouter.put("/", async (req, res) => {
  const body = req.body;
  const success = updatedUserSchema.parse(body);
  if (!success) {
    res.status(411).json({ message: "Invalid creds" });
  }
  const updatedUser = await User.findOneAndUpdate({ _id: req.userId }, body);
  res.json({ message: "User updated successfully", updatedUser });
});

userRouter.get("/bulk", async (req, res) => {
  const query = req.query.filter || "";
  let users = [];
  if (!query) {
    users = await User.find({})?.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    }));
  } else {
    users = await User.find({
      $or: [{ firstname: { $regex: query } }, { lastname: { $regex: query } }],
    }).map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    }));
  }

  res.status(200).json({ users });
});

module.exports = userRouter;
