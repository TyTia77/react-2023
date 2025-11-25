interface IComponentTogglerProps {
  children: React.ReactNode;
  active: boolean;
}

export function ComponentToggler(props: IComponentTogglerProps) {
  const { children, active } = props;

 return active ? <>{children}</> : <></>
}
