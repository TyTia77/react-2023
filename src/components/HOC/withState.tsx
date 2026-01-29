import { useSelector, useDispatch } from "react-redux";
import reducers from "store/reducers";
import { RootState } from "index";

export const withState = (WrappedComponent: any) => {
  return (props: any) => {
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const newProps = {
      state,
      // reducers,
      dispatch,
    };

    return <WrappedComponent {...props} {...newProps} />;
  };
};
