import { DataSource } from "typeorm"
import { User } from "../Entities/User"
import { Bottle } from "../Entities/Bottle"
import { BottleUsed } from "../Entities/BottleUsed"
import { Cure } from "../Entities/Cure"
import { DetailPrepMolecule } from "../Entities/DetailPrepMolecule"
import { Molecule } from "../Entities/Molecule"
import { GroupProtocol } from "../Entities/ParentProtocol"
import { Patient } from "../Entities/Patient"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { Prescription } from "../Entities/Prescription"
import { Protocol } from "../Entities/Protocol"
import { ProtocolAssociation } from "../Entities/ProtocolAssociation"
import { ProtocoleMoleculeAssociation } from "../Entities/ProtocoleMoleculeAssociation"
import { Vehicule } from "../Entities/Vehicule"
import { PrepMoleculeHistory } from "../Entities/HistoryEntities/PrepMoleculeHistory"
import { PatientHistory } from "../Entities/HistoryEntities/PatientHistory"

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
  //entities: ["./src/Entities/*.js"],
  migrations: ["./src/migrations/*"],
  entities: [
    User,
    Bottle,
    BottleUsed,
    Cure,
    DetailPrepMolecule,
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
  ],
})
