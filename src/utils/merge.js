export default function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        // eslint-disable-next-line no-undefined
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}
