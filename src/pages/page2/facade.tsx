import React, { useEffect } from "react";
import { executed } from "store/reducers";

export const withFacade = (WrappedComponent: any) => {
  return (props: any) => {
    const { state, dispatch } = props;
    const { page2 } = state;

    const newProps = {
      initTip: page2.initTip,
      tipExecuted: () => dispatch(executed()),
    };

    return <WrappedComponent {...newProps} />;
  };
};
