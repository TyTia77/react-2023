// execute after delay of XXms
export function debounce(fn: Function, delay = 500) {
  
  let timer: any

  return function (this: any) {

    let context = this
    let args = arguments

    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}