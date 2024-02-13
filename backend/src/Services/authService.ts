import db from "../Config/db"
import { User } from "../Entities/User"
import { HttpError, StatusCode } from "../Utils/HttpError"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getSecretJWT } from "../Utils/helpers"

export async function login(username: string, password: string) {
  const userRepo = db.getRepository(User)
  const user = await userRepo.findOneBy({
    username,
  })
  if (!user) throw new HttpError("username is incorrect", StatusCode.BadRequest)

  const isCorrect = await bcrypt.compare(password, user.password)
  if (!isCorrect) {
    throw new HttpError("password is incorrect", StatusCode.BadRequest)
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    getSecretJWT(),
  )
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
  }
}
