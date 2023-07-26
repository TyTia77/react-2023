import { useRef } from "react"

export const UseRef = () => {
  const ref = useRef<HTMLDivElement>(null);

  console.error({
    ref
  });

  return (
    <div ref={ref}>useRef</div>
  )
}