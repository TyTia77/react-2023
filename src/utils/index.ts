


// class
export class Test {
    private message: string;

    constructor(mes: string){
        this.message = mes;
    }

    greet(){
        return 'sup, ' + this.message;
    }

    reverse() {
        // do reverse
        this.message = this.message
        .split('')
        .reverse()
        .join('')

        return this;
    }
}

//fix
export function debounce(){
    return function(){

    }
}

//fix
export function throttle(){
    let flag = false
    return function(this: any){
      let context = this
      let args = arguments

      if (flag){
        flag = true
        setTimeout(function(){
          flag = false
        }, 500)
      }
    }
}

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