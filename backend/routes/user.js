const express = require("express");

const zod = require("zod");
const { User } = require("../db.js");
const { Account } = require("../db.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

const { authMidleware } = require("../routes/middleware.js");

const router = express.Router();

const signUpBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  const { success } = signUpBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      msg: "Invalid Output",
    });
  }

  const existingUser = await User.findOne({
    username,
  });

  if (existingUser) {
    return res.status(400).json({
      msg: "User already exists",
    });
  }

  const user = await User.create({
    username,
    password,
    firstName,
    lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    msg: "User Created Successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const { success } = signInBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      msg: "Invalid Output",
    });
  }

  try {
    const user = await User.findOne({
      username,
      password,
    });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user?._id,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      msg: "User Logged In Successfully",
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Error while logging in",
    });
  }
});

router.put("/updateUser", authMidleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      msg: "Invalid Output",
    });
  }

  const user = await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  if (!user) {
    return res.status(400).json({
      msg: "User not found",
    });
  }

  return res.status(200).json({
    msg: "User Updated Successfully",
    user: user,
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/getUser", authMidleware, async (req, res) => {
  const userId = req.userId;

  const user = await User.findById({
    _id: userId,
  });

  if (!user) {
    return res.status(400).json({
      msg: "User not found",
    });
  }

  return res.status(200).json({
    msg: "User found Successfully",
    user: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    },
  });
});

module.exports = router;
