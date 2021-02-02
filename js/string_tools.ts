// 去除空格
let pure = (str) => str.split(' ').join('')
let str = pure('12 3 ')
console.log(str)

// 生成随机数
let randomId = (len) =>
  Math.random()
    .toString(36) // 转换成相应的进制
    .substring(3, len) // 去除 .0
let str1 = randomId(10)
console.log(str1)
