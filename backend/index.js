const express = require("express");
const rootRouter = require("./routes/index.js")
const cors = require('cors')

const app = express()
const corsOption = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/v1", rootRouter)


app.listen(3000)