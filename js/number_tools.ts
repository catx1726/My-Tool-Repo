// 取整
let num1 = ~~1.5
let num2 = 1.5 | 0
let num3 = 1.5 >> 0
console.log(num1, num2, num3)

// 精确保留小数位
// DES 1.597 会有BUG，进位后结果为 1.6，所以最好不要四舍五入，如果要四舍五入的话要考虑补0问题
// let fn = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal
let fn = <T extends number>(num: T, decimal: T) => Math.floor(num * 10 ** decimal) / 10 ** decimal
let num = fn(1.597, 2)
console.log(num)

// 范围值[1,10]
let random = <T extends number>(min: T, max: T) => Math.floor(Math.random() * (max - min + 1)) + min
let num4 = random(1, 10)
console.log(num4)
