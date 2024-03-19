import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

import db from "./Config/db"
import { HttpError } from "./Utils/HttpError"
import auth from "./Routers/auth"
import userRouter from "./Routers/user"
import patientRouter from "./Routers/patient"
import moleculeRouter from "./Routers/molecule"
import protocolRouter from "./Routers/protocol"
import prescriptionRouter from "./Routers/prescription"
import cureRouter from "./Routers/cure"
import prepRouter from "./Routers/prepMolecules"
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

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

//routers
app.use("/auth", auth)
app.use(authorization)
app.use("/user", userRouter)
app.use("/patient", patientRouter)
app.use("/molecule", moleculeRouter)
app.use("/protocol", protocolRouter)
app.use("/prescription", prescriptionRouter)
app.use("/cure", cureRouter)
app.use("/prep", prepRouter)

//error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    return
  }
  console.log(error)
  res.status(500)
  if (error instanceof HttpError) res.status(error.code)
  res.json({ message: error.message || "Something broke" })
})

const server = app.listen(PORT, () => {
  console.log("server started ")
  console.log(server.address())
})
