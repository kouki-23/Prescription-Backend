import "reflect-metadata"
import https from "https"
import fs from "fs"
import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"

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
import productRouter from "./Routers/product"
import vehiculeRouter from "./Routers/vehicule"
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

app.use(helmet())
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())
if (process.env.ENV === "dev") {
  app.use(morgan("dev"))
} else {
  var accessLogStream = fs.createWriteStream("./logs/access.log", {
    flags: "a",
  })
  app.use(morgan("combined", { stream: accessLogStream }))
}

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
app.use("/product", productRouter)
app.use("/vehicule", vehiculeRouter)

//error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    return
  }
  //console.log(error)
  res.status(500)
  if (error instanceof HttpError) res.status(error.code)
  res.json({ message: error.message || "Something broke" })
})

if (process.env.ENV !== "dev") {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync("cert/private.key"),
      cert: fs.readFileSync("cert/certificate.crt"),
      ca: fs.readFileSync("cert/ca_bundle.crt"),
    },
    app,
  )

  const server = httpsServer.listen(PORT, () => {
    console.log("server started ")
    console.log(server.address())
  })
} else {
  const server = app.listen(PORT, () => {
    console.log("server started ")
    console.log(server.address())
  })
}
