import { FC } from 'react';
import { Context } from './useContext.context';

export const Provider: FC<any> = ({children}) => {
  return (
    <Context.Provider value={['provider value']}>
      {children}
    </Context.Provider>
  );
}