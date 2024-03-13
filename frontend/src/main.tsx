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
import ListPrescription from "@pages/Prescription/ListPrescription"

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
            <Route element={<Layout />}>
              <Route path="/medecin" element={<AuthGuard role="medecin" />}>
                <Route path="" element={<ListPatient />} />
                <Route path="addPatient" element={<AddPatient />} />
                <Route
                  path="prescription/:patientId"
                  element={<ListPrescription />}
                />
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
