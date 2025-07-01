// limit execution to after every XXms
export function throttle(fn: Function, limit = 500) {

  let flag = true

  return function (this: any) {
    const context = this
    const args = arguments

    if (flag) {
      fn.apply(context, args)
      flag = false
      
      setTimeout(function () {
        flag = true
      }, limit)
    }
  }
}