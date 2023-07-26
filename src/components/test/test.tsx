import { useEffect, useState } from "react"

export const Test = (props: any) => {
  const [text, setText] = useState('')

  useEffect(() => {
    const int = setInterval(() => {
      const frame = window.requestAnimationFrame(() => {
        window.cancelAnimationFrame(frame)
        setText(`${(Math.random() * 1000) + 1}`)
      })
    }, 2000)

    return () => {
      clearInterval(int)
    }
  }, [])

  return <>{text}</>
}