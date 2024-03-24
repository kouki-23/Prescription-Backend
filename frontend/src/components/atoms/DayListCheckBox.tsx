type Props = {
  nbDays: number
  selectedDays: number[]
  setSelectedDays: (days: number[]) => void
}

export default function DayListCheckBox({
  nbDays,
  selectedDays,
  setSelectedDays,
}: Props) {
  return (
    <div className="flex gap-4 py-4 w-full overflow-y-auto">
      {Array.from(Array(nbDays), (_, i) => {
        return (
          <label className="flex items-center gap-2" key={i}>
            <input
              className="size-5"
              type="checkbox"
              checked={selectedDays.find((a) => a === i + 1) ? true : false}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedDays([...selectedDays, i + 1])
                } else {
                  setSelectedDays(selectedDays.filter((a) => a !== i + 1))
                }
              }}
            />
            J{i + 1}
          </label>
        )
      })}
    </div>
  )
}
