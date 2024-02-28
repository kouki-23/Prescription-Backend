import { DataSource } from "typeorm"
export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: "prescription",
  //synchronize: true,
  //dropSchema: true,
  logging: true,
  entities: ["./src/Entities/*{.ts,.js}"],
})
