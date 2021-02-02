/* eslint-disable no-unused-vars */
/* eslint-disable no-sparse-arrays */
/* --------------------------------------------------------------------- */
// 基本数据类型——去重
let pureArray = [...new Set([1, 1, 2, 3, 4, 5])]
console.log('duplicate basic types pureArray:', pureArray)

// 数组对象去重方法1——filter Map
let arr = [
  { name: 'cad', id: 3 },
  { name: 'cad', id: 3 }
]
let filterMapDuplicateFn = (arr, prop) => {
  let map = new Map()
  return arr.filter((item) => !map.has(item[prop]) && map.set(item[prop], 1))
}
let filterMapAfterData = filterMapDuplicateFn(arr, 'id')
console.log('duplicate [Object] filterMapAfterData:', filterMapAfterData)
/* --------------------------------------------------------------------- */

/* --------------------------------------------------------------------- */
// 过滤假值 👍
// eslint-disable-next-line no-undefined
let pureArray1 = [null, undefined, '', 1, 2, 3, 4].filter(Boolean)
console.log('filter fake value pureArray1:', pureArray1)

// 过滤空值 🐷
let tempArray = [, 1, 2, 3, , , , 6]
let pureArray3 = []
tempArray.forEach((i) => {
  pureArray3.push(i)
})
console.log('filter null value pureArray3:', pureArray3)
/* --------------------------------------------------------------------- */

/* --------------------------------------------------------------------- */
// 排序
let pureArray2 = [1, 3, 4, 6, 2].sort((a, b) => a - b)
console.log('sort pureArray2:', pureArray2)
/* --------------------------------------------------------------------- */

/* --------------------------------------------------------------------- */
// 在数组中获取最大值
let array = [1, 2, 3, 56, 76, 222]
let max = (array) => Math.max.apply(null, array)
console.log('max value in array:', max(array))
/* --------------------------------------------------------------------- */
