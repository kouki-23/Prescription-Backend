import Model from "@components/atoms/Model"
import Title from "@components/atoms/Title"
import { Product } from "@helpers/types"
import closeIcon from "@assets/icons/closeDetail.svg"

type Props = {
  data: Product
  isOpen: boolean
  setIsOpen: (b: boolean) => void
}

export default function DetailsSpeciality({ data, isOpen, setIsOpen }: Props) {
  return (
    <Model
      onClose={() => {
        setIsOpen(false)
      }}
      isOpen={isOpen}
    >
      <div className="absolute right-8 top-8">
        <img
          src={closeIcon}
          className="size-4 cursor-pointer "
          onClick={() => setIsOpen(false)}
        />
      </div>
      <Title className="text-4xl" text="Détails Specialité" />
      <div className="mt-4">
        <ProductDetails label="Spécialité" text={data.specialite} />
      </div>
      <div className="grid grid-cols-2 gap-6 gap-x-10 mt-6 ml-14">
        <ProductDetails label="Voie" text={data.molecule.way} />
        <ProductDetails label="Molecule" text={String(data.molecule.name)} />

        <ProductDetails
          label="C Min"
          text={String(data.minConcentrarion) + " mg/ml"}
        />
        <ProductDetails
          label="C Max"
          text={String(data.maxConcentrarion) + " mg/ml"}
        />
        <ProductDetails label="Volume" text={String(data.volume) + " ml"} />
        <ProductDetails
          label="Volume Dilution"
          text={String(data.dilutionVolume) + " ml"}
        />
        <ProductDetails
          label="Sensiblilité PVC"
          text={String(data.SensivityPVC ? "Oui" : "Non")}
        />
        <ProductDetails
          label="Abri lumière"
          text={String(data.lightShelter ? "Oui" : "Non")}
        />
        <ProductDetails
          label="Conservation Frigo"
          text={String(data.conservationReconstitutionFridge ? "Oui" : "Non")}
        />
        <ProductDetails
          label="Conservation dilution Frigo"
          text={String(data.conservrationDilutionFridge ? "Oui" : "Non")}
        />
        <ProductDetails
          label="Délai conservation"
          text={String(data.concervationtionPeriodDilution) + " Jours"}
        />
        <ProductDetails
          label="Pret à reconstituer"
          text={String(data.isReconstruct ? "Oui" : "Non")}
        />
        <ProductDetails label="Dosage" text={String(data.dosage) + " mg"} />
        <ProductDetails
          label="Commentaire"
          text={data.comment ? data.comment : "Aucun"}
        />
      </div>
    </Model>
  )
}

function ProductDetails({ label, text }: { label: string; text: string }) {
  return (
    <div className="font-medium space-x-2">
      <span>{label}:</span>
      <span className="text-secondary-blue font-medium">{text}</span>
    </div>
  )
}
