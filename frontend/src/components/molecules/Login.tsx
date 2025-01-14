import LoginBtn from "@components/atoms/LoginBtn"
import LoginInput from "@components/atoms/LoginInput"
import Title from "@components/atoms/Title"
import userIcon from "@assets/icons/user.svg"
import passwordIcon from "@assets/icons/password.svg"
import { useState } from "react"
import { login } from "@helpers/apis/user"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@helpers/auth/auth"
import { handleError } from "@helpers/apis"

type Props = {}

export default function Login({}: Props) {
  const naviagte = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const auth = useAuth()
  async function submitLogin() {
    try {
      const response = await login(username, password)
      const { user, accessToken } = response.data
      auth.login(user, accessToken)
      naviagte("/")
    } catch (e) {
      toast.error(handleError(e))
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <Title className="mb-12" text="CONNEXION" />
      <LoginInput
        placeholder="Nom d'utilisateur"
        icon={userIcon}
        value={username}
        setValue={setUsername}
      />
      <LoginInput
        type="password"
        placeholder="Mot de passe"
        icon={passwordIcon}
        value={password}
        setValue={setPassword}
      />
      <div className="h-3"></div>
      <LoginBtn clickFn={submitLogin} text="Confirmer" />
    </div>
  )
}
