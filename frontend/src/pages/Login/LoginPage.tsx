import Login from "../../components/molecules/Login"
import logo from "../../assets/asqii_full_logo.svg"

export default function LoginPage() {
  return (
    <div className="w-screen flex">
      <div className="w-1/2 flex flex-col justify-center items-center bg-primary-blue h-screen">
        <img src={logo} className="w-[405px] h-[99px]" />
        <p className="mt-4 text-4xl text-white-shade font-medium">
          Module prescription
        </p>
      </div>
      <div className="w-1/2 my-auto px-52">
        <Login />
      </div>
    </div>
  )
}
