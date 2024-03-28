import Model from "@components/atoms/Model"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import TextInput from "@components/atoms/TextInput"
import Title from "@components/atoms/Title"
import { useState } from "react"
import { UseMutationResult } from "@tanstack/react-query"

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  mutation: UseMutationResult<void, Error, string, unknown>
}

function PasswordConfirmation({ isOpen, setIsOpen, mutation }: Props) {
  const [password, setPassword] = useState("")
  return (
    <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Title className="text-3xl" text="Entrez votre mot de passe" />
      <p className="font-medium py-6">
        Pour confirmer l'enregistrement , veuillez entrer votre mot de passe :
      </p>
      <div className="flex items-center gap-3">
        <span className="font-medium">Mot de passe</span>
        <TextInput
          value={password}
          setValue={(s) => setPassword(s)}
          isPassword={true}
        />
      </div>
      <PrimaryBtn
        className="px-4 py-2 mt-8"
        text="Enregistrer"
        clickFn={() => mutation.mutate(password)}
        isDefault={true}
      />
    </Model>
  )
}

export default PasswordConfirmation
