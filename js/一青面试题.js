/* ## 1. 命名规范和ESLint规范 */
/* ### ⼆、按照ESLint规范优化 */
function func() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    })
  })
}

/* ## 2. 原型与原型链相关 */
/* ### 三、console.log的打印内容 */
var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a)
    }
  }
}
o.b.fn() // 12

var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a)
      console.log(this)
    }
  }
}
var j = o.b.fn
j() // undefined  window 对象

/* ##  3. Object、Array、String、Number相关 */
/* ### 如题：const obj = { '1': [222, 342, 445], '2': [612, 82, 10, 11], '3': [9, 7, 222, 11] } */
const obj = { 1: [222, 342, 445], 2: [612, 82, 10, 11], 3: [9, 7, 222, 11] }
// ⼀、输出数组的key，并且为：[1, 2, 3]
let tempKeyArr = [...new Set(Object.keys(obj))]

// ⼆、找到最⼤和最⼩的value值
let tempMaxOrMinArr = Object.values(obj).flat(),
  min = Math.min.apply(null, tempMaxOrMinArr),
  max = Math.max.apply(null, tempMaxOrMinArr)
console.log(
  'source:',
  tempMaxOrMinArr,
  'max:',
  Math.max.apply(null, tempMaxOrMinArr),
  'min:',
  Math.min.apply(null, tempMaxOrMinArr)
)

// 三、将obj的value值转换成⼀维数组，并且从⼤到⼩排序答：
let tempObjValueArr = Object.values(obj).flat(),
  sortedObjValueArr = tempObjValueArr.sort((a, b) => a - b)

// 四、输出obj所有键值不重复的个数
let tempDuplicateLength = objNotRepeatKeyCount(obj)
function objNotRepeatKeyCount(obj) {
  let arr = Object.keys(obj),
    temp = []
  arr.forEach((item) => (temp.includes(item) ? '' : temp.push(item)))
  return temp.length
}

// 五 ：var arr = [1,2,3,4,5,6,7,8,9] 删除最前⾯⼀个，删除最后⾯⼀个，将8放在4后⾯，将7放在6前⾯
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
arr.splice(0, 1)
arr.splice(arr.length - 1, 1)
arr.splice(arr.indexOf(4) + 1, 0, arr[arr.indexOf(8)])
arr.splice(arr.lastIndexOf(8), 1)
arr.splice(arr.indexOf(6), 0, arr[arr.indexOf(7)])
arr.splice(arr.lastIndexOf(7), 1)

// 六、console.log输出结果
for (var i = 0; i <= 4; i++) {
  setTimeout(function () {
    console.log(i)
  }, 1000)
}
// 5 重复 5 次

/* ## 8. const funcs = [func, func, func]，设计⼀个函数，要求如下：
      每5秒⼀次轮询，每请求失败3次，当前函数轮询时间加倍（5秒，10秒，20秒，40秒），成功当前函数停⽌请求，所有成功返 
*/
// 1. 第一次轮询处理函数
// 2. 处理完之后，开始依照时间进行轮询
// 3. 对每个函数的成功和错误进行处理，如果失败则修改轮询时间，全部成功则返回

var fnList = [requestFn, requestFn, requestFn]

function pollsRequest(fnList) {
  // 封装函数
  let tempList = fnList.map((fn, index) => handleFnFormatter(fn, index))
  // 轮询
  tempList.forEach((item, index) => {
    item.timer = setInterval(() => {
      requestFn(item, tempList)
    }, item.time)
  })
}

function cleanTimer(curFn) {
  clearInterval(curFn.timer)
  curFn.timer = null
  return true
}

function resetTimer(curFn, fnList) {
  cleanTimer(curFn)
  curFn.timer = setInterval(() => {
    requestFn(curFn, fnList)
  }, curFn.time)
}

/* 处理当前失败的情况，如果到三次之后，更新定时器 */
function handleCurFnFail(curFn, fnList) {
  curFn.failTimes++
  if (curFn.failTimes % 3 === 0) {
    curFn.time = curFn.time * 2
    resetTimer(curFn, fnList)
    return
  }
  console.log('handleCurFnFail:', curFn.name, curFn)
  return curFn
}

/* 处理成功 */
function handleCurFnSuccess(curFn, fnList) {
  if (curFn.state) return
  curFn.state = true
  let allRight = handleCheckElseFnState(curFn, fnList)
  console.log('handleCurFnSuccess curFn:', curFn.name, ',allRight:', allRight, fnList)
  return allRight ? fnList : false
}

/* 去检查其他的是否全部成功，如果全部成功则全部返回，如果有一个没成功则给他加时 */
function handleCheckElseFnState(curFn, fnList) {
  let allRight = fnList.every((item) => {
    if (item.state) {
      cleanTimer(item)
      console.log('clearCurFnTimer because:', curFn.name, item.name)
      return item.state
    }
  })
  return allRight
}

/* 将 fn 包裹进一个对象中，并且对象上挂载相应的属性 */
function handleFnFormatter(fn, index) {
  return {
    fn,
    time: 500,
    state: false,
    name: `${fn.name}-${index}`,
    timer: null,
    failTimes: 0
  }
}

function requestFn(curFn, fnList) {
  let random = Math.floor(Math.random() * (5000 - 1000) + 1000)
  // 模拟失败
  if (random < 4000 && !curFn.state) {
    return handleCurFnFail(curFn, fnList)
  }
  // 模拟成功
  return handleCurFnSuccess(curFn, fnList)
}

pollsRequest(fnList)

/* ## 8.1  设计⼀个函数func，要求：
      var obj = {a: 1, b: 2} var value = func(obj); value.a // 1
      value.b // 2
      value.c // 0
      value.d // 0
*/
var defaultParmasObj = { a: 0, b: 0, c: 0, d: 0 },
  obj = { a: 1, b: 2 }
function handleFnDefaultParamsOne({
  a = defaultParmasObj.a,
  b = defaultParmasObj.b,
  c = defaultParmasObj.c,
  d = defaultParmasObj.d
} = defaultParmasObj) {
  return { a, b, c, d }
}

function handleFnDefaultParamsTwo(obj) {
  return {
    ...defaultParmasObj,
    ...obj
  }
}
handleFnDefaultParamsOne(obj)

handleFnDefaultParamsTwo(obj)
