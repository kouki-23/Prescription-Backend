import Model from "@components/atoms/Model"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import SecondaryBtn from "@components/atoms/SecondaryBtn"
import Title from "@components/atoms/Title"

type Props = {
  text: string
  isOpen: boolean
  setIsOpen: (b: boolean) => void
  confirmFn: () => void
}

export default function ConfirmModel({
  text,
  isOpen,
  setIsOpen,
  confirmFn,
}: Props) {
  return (
    <Model onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <Title className="mb-4" text="Confirmer" />
      <p className="py-6">{text}</p>
      <div className="space-x-6">
        <SecondaryBtn
          className="px-8 py-3"
          clickFn={() => setIsOpen(false)}
          text="No"
        />
        <PrimaryBtn className="px-8 py-3" clickFn={confirmFn} text="Oui" />
      </div>
    </Model>
  )
}
