const parseQuery = (qs) => {
  return qs
}

const person = {
  age: 38,
  name: 'Ethan Tian',
  height: '170cm',
}

const sum = (arr) => {
  const res = arr.map((item) => item + 1).reduce((acc, cur) => acc + cur, 0)
  return res
}

export default {
  parseQuery,
  ...person,
  sum,
}
