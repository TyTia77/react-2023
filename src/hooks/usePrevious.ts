import { useRef } from "react"

export function usePrevious<T>(value: T) {
  const currentRef = useRef(value)
  const previousRef: any = useRef()

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current
    currentRef.current = value
  }

  return previousRef.current
}