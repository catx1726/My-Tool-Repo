const composeDirHandle = new Map([
  [
    'lr',
    (params, fns) => {
      fns.forEach((fn) => (params = fn(params)))
      console.log('lr handle end:', params, fns)
      return params
    }
  ],
  [
    'rl',
    (params, fns) => {
      fns.reverse()
      fns.forEach((fn) => (params = fn(params)))
      console.log('rl handle end:', params, fns)
      return params
    }
  ]
])

function compose(params, direction, fns) {
  if (!fns || !fns.length || !params) return

  return composeDirHandle.get(direction)(params, fns) || 'unknown'
}

function add(num) {
  return num + 10
}

function minus(num) {
  return num - 10
}

console.log(compose(5, 'lr', [add, add, minus]), compose(5, 'rl', [add, add, minus]))
