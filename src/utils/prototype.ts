export {}

declare global {
  interface Function {
    mybind: any;
  }
}

//@ts-ignore
Function.prototype.mybind = function (this, ...arg) {
  const obj = this;
  const args = arg.slice(1);

  //@ts-ignore
  return function (...ok) {
    obj.apply(arg[0], args.concat(ok));
  };
};



