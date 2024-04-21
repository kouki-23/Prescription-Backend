import { Dialog } from "@headlessui/react"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Model({ children, isOpen, onClose }: Props) {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 w-screen h-screen z-20 bg-primary-blue bg-opacity-45 flex justify-center items-center overflow-y-auto"
      open={isOpen}
      onClose={onClose}
    >
      <Dialog.Panel className="bg-white-shade p-16 px-28 w-fit h-fit rounded-3xl flex flex-col items-center">
        {children}
      </Dialog.Panel>
    </Dialog>
  )
}
