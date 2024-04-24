import PrimaryBtn from "@components/atoms/PrimaryBtn"
import SecondaryBtn from "@components/atoms/SecondaryBtn"
import Title from "@components/atoms/Title"
import { AdminLabledInput } from "@components/molecules/AdminLabledInput"
import { AdminLabledOption } from "@components/molecules/AdminLabledOption"
import { handleError } from "@helpers/apis"
import { addUser } from "@helpers/apis/user"
import { Option, UserRole } from "@helpers/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { isEmpty } from "../../helpers/validation"

export type UserForm = {
  name: string
  username: string
  password: string
  role: UserRole | undefined
}

const roleOptions: Option<UserRole>[] = Object.values(UserRole).map((u) => ({
  value: u as UserRole,
  label: u,
}))

export default function AddUser() {
  const navigator = useNavigate()
  const queryClient = useQueryClient()
  const [user, setUser] = useState<UserForm>({
    name: "",
    username: "",
    password: "",
    role: undefined,
  })

  const addMut = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      if (!addMut.isPending) await addUser(user)
    },
    onError: (e) => toast.error(handleError(e)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("produit ajouter avec succès")
      navigator("/admin/user")
    },
  })

  return (
    <div className="container p-10">
      <Title text="Ajouter utilisateur" className="py-16 pb-20" />
      <div className="px-10 grid grid-cols-2 gap-32">
        <AdminLabledInput
          text="Nom"
          value={user.name}
          setValue={(s) => setUser({ ...user, name: s })}
        />
        <AdminLabledInput
          text="Nom d'utilisateur"
          value={user.username}
          setValue={(s) => setUser({ ...user, username: s })}
        />
        <AdminLabledInput
          text="Mot de passe"
          value={user.password}
          setValue={(s) => setUser({ ...user, password: s })}
        />
        <AdminLabledOption
          options={roleOptions}
          text="Role"
          selected={roleOptions.find((p) => p.value === user.role)}
          setSelected={(s) => setUser({ ...user, role: s.value })}
        />
      </div>
      <div className="flex gap-32 justify-center mt-32">
        <SecondaryBtn text="Annuler" clickFn={() => navigator(-1)} />
        <PrimaryBtn
          text="Ajouter"
          clickFn={() => {
            if (verif(user)) addMut.mutate()
          }}
        />
      </div>
    </div>
  )
}

function verif(user: UserForm): boolean {
  if (isEmpty(user.name)) {
    toast.error("nom est obligatore")
    return false
  }
  if (isEmpty(user.password)) {
    toast.error("mot de passe est obligatore")
    return false
  }
  if (isEmpty(user.username)) {
    toast.error("Nom d'utilisateur est obligatore")
    return false
  }
  if (user.role === undefined) {
    toast.error("role est obligatore")
    return false
  }

  return true
}
