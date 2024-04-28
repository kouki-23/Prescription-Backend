import Model from "@components/atoms/Model"
import Title from "@components/atoms/Title"
import { Product } from "@helpers/types"

type Props = {
  data: Product
  isOpen: boolean
  setIsOpen: (b: boolean) => void
}
export function DetailsSpeciality({ data, isOpen, setIsOpen }: Props) {
  return (
    <Model
      onClose={() => {
        setIsOpen(false)
      }}
      isOpen={isOpen}
    >
      <Title className="text-4xl" text="Détails Specialité" />
      <ProductDetails label="Nom" text={data.specialite} />
      <ProductDetails label="Nom" text={String(data.volume)} />
    </Model>
  )
}

function ProductDetails({ label, text }: { label: string; text: string }) {
  return (
    <div className="  font-medium space-x-2">
      <span>{label}:</span>
      <span className="text-primary-blue font-medium">{text}</span>
    </div>
  )
}
