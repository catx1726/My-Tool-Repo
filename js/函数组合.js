function compose(params, ...fns) {
  console.log('compose:', params, fns)

  if (!fns || !fns.length) return

  fns.forEach((fn) => (params = fn(params)))

  return params
}

function add(num) {
  return num + 10
}

function minus(num) {
  return num - 10
}

console.log(compose(5, add, add, minus))
