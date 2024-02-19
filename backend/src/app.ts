import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

import db from "./Config/db"
import { HttpError } from "./Utils/HttpError"
import auth from "./Routers/auth"
import { authorization } from "./Middlewares/auth"
import { User } from "./Entities/User"
import morgan from "morgan"
import cookieParser from "cookie-parser"

db.initialize()
  .then(() => {
    console.log("Data Base has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Base initialization", err)
    process.exit(1)
  })

// extend Request to have user
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

//routers
app.use("/auth", auth)
app.use(authorization)

//error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    return
  }
  res.status(500)
  if (error instanceof HttpError) res.status(error.code)
  res.json({ message: error.message || "Something broke" })
})

const server = app.listen(PORT, () => {
  console.log("server started ")
  console.log(server.address())
})
