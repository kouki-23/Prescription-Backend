import { Outlet } from "react-router-dom"
import Header from "../molecules/Header"

type Props = {}

export default function Layout({}: Props) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
