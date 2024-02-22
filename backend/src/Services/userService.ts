import db from "../Config/db"
import { User, UserRole } from "../Entities/User"
import { CreateUserBody } from "../Middlewares/validation/schema"
import bcrypt from "bcrypt"

export async function createUser(userB: CreateUserBody) {
  const user = new User()
  user.name = userB.name
  user.username = userB.username
  user.role = userB.role as UserRole
  user.serviceType = userB.serviceType
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(userB.password, salt)
  user.password = hashedPassword
  const userC = await db.getRepository(User).save(user)
  return userC
}
