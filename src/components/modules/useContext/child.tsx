import { Context } from './useContext.context'
import { useContext } from 'react';

export const Child = () => {
  const [context] = useContext(Context)

  console.error({
    context
  });
  
  return (
    <div>context child</div>
  )
}