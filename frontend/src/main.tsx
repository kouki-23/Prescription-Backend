import React, { lazy } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
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
                <Route path="specialite" element={<SpecialityList />} />
                <Route path="ajouterSpecialite" element={<AddSpeciality />} />
              </Route>
              <Route path="ajouteProtocole" element={<AddProtocolPage />} />
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
                path="/admin"
                element={<AuthGuard role={UserRole.ADMIN} />}
              >
                <Route path="ajouterprotocole" element={<AddProtocolPage />} />
                <Route path="" element={<ListProtocolPage />} />
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
    <ToastContainer />
  </React.StrictMode>,
)
