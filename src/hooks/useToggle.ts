import { useState } from "react"

export function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue)

  function toggleValue(value?: boolean) {
    setValue((currentValue) => value ? value : !currentValue)
  }

  return [value, toggleValue] as const
}