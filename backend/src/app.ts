import "reflect-metadata"
import https from "https"
import fs from "fs"
import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"

dotenv.config()

import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"
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
import hl7patientRouter from "./Routers/hl7patient"
import hl7prescriptionRouter from "./Routers/hl7prescription"


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

Sentry.init({
  dsn: "https://7839fb88cd5d68f4aa845e4b6bf6bedf@o4507147507007488.ingest.de.sentry.io/4507164809494608",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    nodeProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())

app.use(Sentry.Handlers.tracingHandler())

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
//app.use("/auth", auth)
//app.use(authorization)
app.use("/hl7patient", hl7patientRouter)
app.use("/hl7prescription",hl7prescriptionRouter) 
app.use("/user", userRouter)
app.use("/patient", patientRouter)
app.use("/molecule", moleculeRouter)
app.use("/protocol", protocolRouter)
app.use("/prescription", prescriptionRouter)
app.use("/cure", cureRouter)
app.use("/prep", prepRouter)
app.use("/product", productRouter)
app.use("/vehicule", vehiculeRouter)


app.use(Sentry.Handlers.errorHandler())

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
