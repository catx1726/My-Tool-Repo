/* 
  四条流水线，ABCD，每月产量10 7 5 4
  1. 优化从最多的流水线抽出 3 ，分到其余三条
  2. 其余的每条多生产 1 
  3. 经过五年(60月)时间，那个最多，每月能生产多少

  初始值: 10 7 5 4
  第一个月：7 8 6 5 => [0 或者称之为 当月产量王 monthlyMax]-3 [1/2/3] + 1
  第二个月：8 5 7 6 => [1]-3 [0/2/3] + 1
  第三个月：5 6 8 7 => [0]-3 [1/2/3] + 1
  第四个月：6 7 5 8 => [2]-3 [0/1/3] + 1

  第五个月：7 8 6 5 => [3]-3 [0/1/2] + 1
  ...
*/

/* 拿到当月产量最高的 队伍 和 index */
function handleListGetMax(list) {
  let num = Math.max.apply(null, list),
    index = list.indexOf(num)
  return { num, index }
}

/* 处理其他队伍的产量 */
function handleTeamVal(maxIndex, list) {
  return list.map((item, index) => {
    return index !== maxIndex ? item + 1 : item - 3
  })
}

function ques(arr, year) {
  let list = arr,
    monthNum = 4
  // monthNum = year * 12

  for (let index = 0; index < monthNum; index++) {
    let tempMaxObj = handleListGetMax(list)
    list = handleTeamVal(tempMaxObj.index, list)
  }
  return handleListGetMax(list)
}

console.log('quesOne:', ques([10, 7, 5, 4], 5))
