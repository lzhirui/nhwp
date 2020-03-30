export const isDef = val => {
  // eslint-disable-next-line no-undefined
  return val !== undefined && val !== null
}
export const isKorean = text => {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
  return reg.test(text)
}
