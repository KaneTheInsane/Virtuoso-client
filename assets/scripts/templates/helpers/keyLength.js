'use strict'

const keyLength = (array) => {
  console.log(array)
  console.log(Object.keys(array))
  console.log(Object.keys(array).length)
  return Object.keys(array).length
}

module.exports = keyLength
