import React, { useEffect } from "react";
import { ComponentToggler } from "components";

export const withFacade = (WrappedComponent: any) => {
  return (props: any) => {
    const { active, ...rest } = props;

    const newProps = {
      ...rest,
    };

    return (
      <ComponentToggler active={active}>
        <WrappedComponent {...newProps} />
      </ComponentToggler>
    );
  };
};
