import React, { useEffect, useState } from "react";
import { executed } from "store/reducers";
import { useSessionStorage } from "hooks";

const storageKey = "page2windows";

export const withFacade = (WrappedComponent: any) => {
  return (props: any) => {
    const { state, dispatch } = props;
    const { page2 } = state;

    const [containerSize, setContainerSize] = useState({
      height: 0,
      top: 0,
      left: 0,
      width: 0,
    });

    const [session, setSession] = useSessionStorage(storageKey, {
      windows: [],
      activeWindow: [],
      initID: 0,
    });

    const newProps = {
      initTip: true,
      // initTip: page2.initTip,
      tipExecuted: () => dispatch(executed()),
      containerSize,
      setContainerSize,
      session,
      setSession,
    };

    return <WrappedComponent {...newProps} />;
  };
};
