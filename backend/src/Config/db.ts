import { DataSource } from "typeorm"
export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_username || "postgres",
  password: process.env.DB_password || "root",
  database: "prescription",
  synchronize: true,
  logging: true,
  entities: ["./src/Entities/*{.ts,.js}"],
})
