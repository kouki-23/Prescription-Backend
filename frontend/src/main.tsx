import React, { lazy } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "@pages/Login/LoginPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AuthGuard, AuthProvider } from "@helpers/auth/Auth"
import Index from "@pages/Index/Index"
import { globalDefault } from "@helpers/apis/index"
import Layout from "@components/organisms/Layout"

import ListPatient from "@pages/Patient/ListPatient"
import AddPatient from "@pages/Patient/AddPatient"
import PrescriptionPage from "@pages/Prescription/PrescriptionPage"
import PrescriptionDetailsPage from "@pages/Prescription/PrescriptionDetailsPage"
import PrescriptionFilePage from "@pages/Prescription/PrescriptionFilePage"
import AddProtocolPage from "@pages/Protocol/AddProtocol"
import SpecialityList from "@pages/Speciality/SpecialityList"
import SideNavbar from "@components/organisms/SideNavbar"
import AddSpeciality from "@pages/Speciality/AddSpeciality"
import ListProtocolPage from "@pages/Protocol/ListProtocol"
import { UserRole } from "@helpers/types"
import NavBar from "@components/molecules/NavBar"
import AdjustementPage from "@pages/Adjustement/AdjustementPage"
import AdjustementDetailsPage from "@pages/Adjustement/AdjustementDetailsPage"
import ListUser from "@pages/User/ListUser"
import AddUser from "@pages/User/AddUser"
import ListMolecule from "@pages/Molecule/ListMolecule"
import AddMolecule from "@pages/Molecule/AddMolecule"
const FicheFabrication = lazy(() => import("@pages/FAB/FicheFabrication"))

globalDefault()

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthGuard />}>
              <Route path="/" element={<Index />} />
            </Route>
            <Route path="/admin" element={<AuthGuard role={UserRole.ADMIN} />}>
              <Route path="" element={<SideNavbar />}>
                <Route path="" element={<Navigate to="user" />} />
                <Route path="specialite" element={<SpecialityList />} />
                <Route path="ajouterSpecialite" element={<AddSpeciality />} />
                <Route path="protocol" element={<ListProtocolPage />} />
                <Route path="user" element={<ListUser />} />
                <Route path="ajouterUser" element={<AddUser />} />
                <Route path="molecule" element={<ListMolecule />} />
                <Route path="ajouterMolecule" element={<AddMolecule />} />
              </Route>
              <Route
                path="protocol/ajouterprotocole"
                element={<AddProtocolPage />}
              />
            </Route>
            <Route
              element={
                <AuthGuard role={[UserRole.MEDECIN, UserRole.PHARMACIEN]} />
              }
            >
              <Route path="/FAB/:prepid" element={<FicheFabrication />} />
              <Route
                path="/:prescriptionid/:cureorder/file"
                element={<PrescriptionFilePage />}
              />
            </Route>
            <Route element={<Layout />}>
              <Route
                path="/medecin"
                element={<AuthGuard role={UserRole.MEDECIN} />}
              >
                <Route path="" element={<ListPatient />} />
                <Route path=":patientId/prescription">
                  <Route path="" element={<PrescriptionPage />} />
                  <Route path=":id" element={<PrescriptionDetailsPage />} />
                </Route>
                <Route path="addPatient" element={<AddPatient />} />
              </Route>
              <Route
                path="/pharmacien"
                element={<AuthGuard role={UserRole.PHARMACIEN} />}
              >
                <Route
                  path="ajustement/adjust/:prepid"
                  element={<AdjustementDetailsPage />}
                />
                <Route element={<NavBar />}>
                  <Route path="" element={<ListPatient />} />
                  <Route path="ajustement" element={<AdjustementPage />} />
                  <Route path="planning" element={<ListPatient />} />
                </Route>
                <Route path=":patientId/prescription">
                  <Route path="" element={<PrescriptionPage />} />
                  <Route path=":id" element={<PrescriptionDetailsPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer draggable="mouse" autoClose={1500} />
  </React.StrictMode>,
)
