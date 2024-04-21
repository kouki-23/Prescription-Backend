import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

type Props = {}

export default function NavBar({}: Props) {
  const [selected, setSelected] = useState(getPath(window.location.pathname))
  return (
    <>
      <div className="flex justify-center gap-10 pt-3">
        <LinkTo
          to=""
          label="Validation"
          selected={selected}
          setSelected={setSelected}
        />
        <LinkTo
          to="ajustement"
          label="Ajustement"
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <Outlet />
    </>
  )
}

function LinkTo({
  label,
  to,
  selected,
  setSelected,
}: {
  label: string
  to: string
  selected: string
  setSelected: (s: string) => void
}) {
  const isSelected = selected === to
  return (
    <Link
      className={`cursor-pointer px-12 py-3 text-primary-blue text-xl ${
        isSelected
          ? "font-medium border-b-4 border-b-secondary-blue border-opacity-30"
          : null
      }`}
      onClick={() => setSelected(to)}
      to={to}
    >
      {label}
    </Link>
  )
}

function getPath(pathName: string): string {
  const indexSlach = pathName.indexOf("/", 1)
  if (indexSlach === -1) {
    return ""
  }
  return pathName.substring(indexSlach + 1, pathName.length)
}
