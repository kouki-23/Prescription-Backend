import { User } from "../Entities/user"
import { DataSource } from "typeorm"

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "prescription",
  synchronize: true,
  logging: true,
  entities: [User],
})
