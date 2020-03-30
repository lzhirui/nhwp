import Vue from 'vue'
import { isString, isObject } from '@/utils/types'

const hasOwnProperty = Object.prototype.hasOwnProperty

export const requireAll = context => context.keys().map(context)

export const noop = () => {}

export const hasOwn = (obj, key) => {
  return hasOwnProperty.call(obj, key)
}

const extend = (to, _from) => {
  for (let key in _from) {
    if (hasOwn(_from, key)) {
      to[key] = _from[key]
    }
  }
  return to
}

export const toObject = arr => {
  let res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export const getValueByPath = (object, _prop) => {
  let prop = _prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

export const getPropByPath = (obj, _path, strict) => {
  let tempObj = obj
  let path = _path
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  let keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

export const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

export const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i
    }
  }
  return -1
}

export const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred)
  return idx !== -1 ? arr[idx] : false
}

export const coerceTruthyValueToArray = function(val) {
  if (Array.isArray(val)) {
    return val
  } else if (val) {
    return [val]
  } else {
    return []
  }
}

export const isIE = () => {
  return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode))
}

export const isEdge = () => {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1
}

export const isFirefox = () => {
  return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i)
}

export const autoprefixer = style => {
  if (typeof style !== 'object') return style
  const rules = ['transform', 'transition', 'animation']
  const prefixes = ['ms-', 'webkit-']
  rules.forEach(rule => {
    const value = style[rule]
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value
      })
    }
  })
  return style
}

export const kebabCase = str => {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

export const capitalize = str => {
  if (!isString(str)) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const looseEqual = (a, b) => {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export const isAndroid = () => {
  const u = navigator.userAgent.toLowerCase()
  return u.indexOf('android') > -1 || u.indexOf('adr') > -1
}

export const arrayEquals = (_arrayA, _arrayB) => {
  let arrayA = _arrayA || []
  let arrayB = _arrayB || []

  if (arrayA.length !== arrayB.length) {
    return false
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false
    }
  }

  return true
}

export const isEqual = (value1, value2) => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2)
  }
  return looseEqual(value1, value2)
}

export const isEmpty = val => {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

export const rafThrottle = fn => {
  let locked = false
  return function(...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      locked = false
    })
  }
}

export const objToArray = obj => {
  if (Array.isArray(obj)) {
    return obj
  }
  return isEmpty(obj) ? [] : [obj]
}

export const getScore = score => {
  const scoreData = new Array(101).fill(0).map((data, idx) => [idx, () => (idx < 60 ? '不及格' : '及格')])
  const scoreMap = new Map(scoreData)
  return scoreMap.get(score) ? scoreMap.get(score)() : '未知分数'
}

export default {
  created() {
    this.uuid = Math.random()
      .toString(36)
      .substring(3, 20)
  }
}
