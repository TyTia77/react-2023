import { useCallback, useEffect, useMemo, useState } from "react";

const Child = ({func}: any) => {
  useEffect(() => {
    console.error('child called');
  }, [func])

  return (
    <div>{func()}</div>
  )
}

export const Display = ({ count }: any) => {
  const memo = useMemo(() => {
    return cal(count);
  }, [count])

  const [simple] = useState(0);

  const cb = useCallback((val: number) => {
    console.error('cb called');
    return Math.random() * 20;
  }, [])

  // useEffect(() => {
  //   const cbb = cb(count);

  //   console.error({
  //     cbb
  //   });
    
  // }, [count])

  return (
    <>    
      <div>{count}</div>
      <div>{memo}</div>
      <Child func={cb} />
    </>
  )
}

function cal(val: number) {
  return val % 2;
}