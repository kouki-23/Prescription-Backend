import React from "react"
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
import SpecialityList from "@pages/Admin/SpecialityList"

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
            <Route path="/admin" element={<AuthGuard role="admin" />}>
              <Route path="ajouteProtocole" element={<AddProtocolPage />} />
              <Route path="" element={<SpecialityList />} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/medecin" element={<AuthGuard role="medecin" />}>
                <Route path="" element={<ListPatient />} />
                <Route path="addPatient" element={<AddPatient />} />
                <Route
                  path=":patientId/prescription"
                  element={<PrescriptionPage />}
                />
                <Route path="prescription/:id">
                  <Route path="" element={<PrescriptionDetailsPage />} />
                  <Route
                    path="file/:cureorder"
                    element={<PrescriptionFilePage />}
                  />
                </Route>
                <Route
                  path="prescription/:id"
                  element={<PrescriptionDetailsPage />}
                />
              </Route>
              <Route
                path="/pharmacien"
                element={<AuthGuard role="pharmacien" />}
              ></Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>,
)
