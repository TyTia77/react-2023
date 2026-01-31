export { debounce as debounce } from "./debounce";
export { throttle as throttle } from "./throttle";
export * from "./playground";
export * from "./prototype";
export * from "./delayLazy";
export * from "./selectionBox";

export function Config() {
  const settings = {
    localhost: "http://localhost:4000/",
  };
}

// class
export class Test {
  private message: string;

  constructor(mes: string) {
    this.message = mes;
  }

  greet() {
    return "hi, " + this.message;
  }

  reverse() {
    // do reverse
    this.message = this.message.split("").reverse().join("");

    return this;
  }
}

// trigger after delay of XXms
// export function debounce(fn: Function, delay = 500) {

//   let timer: any

//   return function (this: any) {

//     let context = this
//     let args = arguments

//     clearTimeout(timer)
//     timer = setTimeout(function() {
//       fn.apply(context, args)
//     }, delay)
//   }
// }

// trigger to always after every XXms
// export function throttle(fn: Function, limit = 500) {

//   let flag = true

//   return function (this: any) {
//     const context = this
//     const args = arguments

//     if (flag) {
//       fn.apply(context, args)
//       flag = false

//       setTimeout(function () {
//         flag = true
//       }, limit)
//     }
//   }
// }

// export const throttle2 = () => {
//     let flag = false;
//     return () => {
//         let context = this;
//         let args = arguments;

//         if (!flag) {
//             flag = true;
//             setTimeout(() => {
//                 flag = false;
//             }, 500)
//         }
//     }
// }

export function getRand(max: number, min?: number) {
  return Math.floor(Math.random() * (max - (min || 0) + 1) + (min || 0));
}
