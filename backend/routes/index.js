// import express, { Router } from "express"
const express = require("express")
const userRouter = require("./user.js")
const accountRouter = require("./accounts.js")


const router = express.Router()

router.use("/user", userRouter)
router.use("/account", accountRouter)

module.exports = router