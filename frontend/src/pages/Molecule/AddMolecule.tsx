import PrimaryBtn from "@components/atoms/PrimaryBtn"
import SecondaryBtn from "@components/atoms/SecondaryBtn"
import Title from "@components/atoms/Title"
import { AdminLabledInput } from "@components/molecules/AdminLabledInput"
import { handleError } from "@helpers/apis"
import { addMolecule } from "@helpers/apis/molecule"
import { isEmpty } from "@helpers/validation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export type MoleculeForm = {
  name: string
  way: string
  comment?: string
}

export default function AddMolecule() {
  const navigator = useNavigate()
  const queryClient = useQueryClient()
  const [molecule, setMolecule] = useState<MoleculeForm>({
    name: "",
    way: "",
    comment: undefined,
  })

  const addMut = useMutation({
    mutationKey: ["molecule"],
    mutationFn: async () => {
      if (!addMut.isPending) await addMolecule(molecule)
    },
    onError: (e) => toast.error(handleError(e)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["molecules"] })
      toast.success("molecule ajouter avec succès")
      navigator("/admin/molecule")
    },
  })

  return (
    <div className="container p-10">
      <Title text="Ajouter utilisateur" className="py-16 pb-20" />
      <div className="px-10 grid grid-cols-2 gap-32">
        <AdminLabledInput
          text="Nom"
          value={molecule.name}
          setValue={(s) => setMolecule({ ...molecule, name: s })}
        />
        <AdminLabledInput
          text="Way"
          value={molecule.way}
          setValue={(s) => setMolecule({ ...molecule, way: s })}
        />
        <AdminLabledInput
          text="Comment"
          value={molecule.comment || ""}
          setValue={(s) => setMolecule({ ...molecule, comment: s })}
        />
      </div>
      <div className="flex gap-32 justify-center mt-32">
        <SecondaryBtn text="Annuler" clickFn={() => navigator(-1)} />
        <PrimaryBtn
          text="Ajouter"
          clickFn={() => {
            if (verif(molecule)) addMut.mutate()
          }}
        />
      </div>
    </div>
  )
}

function verif(molecule: MoleculeForm): boolean {
  if (isEmpty(molecule.name)) {
    toast.error("nom est obligatore")
    return false
  }
  if (isEmpty(molecule.way)) {
    toast.error("voie est obligatore")
    return false
  }

  return true
}
