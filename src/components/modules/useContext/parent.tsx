import { Provider } from './useContext.provider';
import { Child } from './child';

export const UseContext = () => {
  return (
    <Provider>
      <Child />
    </Provider>
  )
}