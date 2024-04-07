import { DataSource } from "typeorm"
import { User } from "../Entities/User"
import { Cure } from "../Entities/Cure"
import { Molecule } from "../Entities/Molecule"
import { GroupProtocol } from "../Entities/GroupProtocol"
import { Patient } from "../Entities/Patient"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { Prescription } from "../Entities/Prescription"
import { Protocol } from "../Entities/Protocol"
import { ProtocolAssociation } from "../Entities/ProtocolAssociation"
import { ProtocoleMoleculeAssociation } from "../Entities/ProtocoleMoleculeAssociation"
import { Vehicule } from "../Entities/Vehicule"
import { PrepMoleculeHistory } from "../Entities/HistoryEntities/PrepMoleculeHistory"
import { PatientHistory } from "../Entities/HistoryEntities/PatientHistory"
import { Product } from "../Entities/Product"
import { ProductUsed } from "../Entities/ProductUsed"

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "prescription",
  //synchronize: true,
  //dropSchema: true,
  logging: process.env.ENV === "dev" ? true : false,
  //entities: ["./src/Entities/*.js"],
  migrations: ["./src/migrations/*"],
  entities: [
    User,
    Cure,
    Molecule,
    GroupProtocol,
    Patient,
    PrepMolecule,
    Prescription,
    Protocol,
    ProtocolAssociation,
    ProtocoleMoleculeAssociation,
    Vehicule,
    PrepMoleculeHistory,
    PatientHistory,
    Product,
    ProductUsed,
    GroupProtocol,
  ],
})
