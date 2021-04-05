/* 
 1. 从数组的当前位置开始，找到第一个大于本身的元素，并返回
 2. 如果没有返回 -1 

 [15,2,8,13] 
 15 -1 
 2 8 
 8 13 
 13 -1

 [9,102,3,1]
 9 102 
 102 -1 
 3 -1 
 1 -1 

 时间复杂度: n2
 最坏的情况: 当前数是最大的数
*/

function ques(list) {
  let len = list.length,
    back = [],
    curMax = null

  for (let index = 0; index < len; index++) {
    // 排除最后一个元素
    if (index === len - 1) {
      back.push(-1)
      break
    }

    for (let afterIdx = index + 1; afterIdx < len; afterIdx++) {
      if (list[index] < list[afterIdx]) {
        curMax = list[afterIdx]
        break
      }
      curMax = -1
    }

    back.push(curMax)
  }
  return back
}

console.log(ques([9, 102, 3, 1]), ques([15, 2, 8, 13]), ques([-1, 0, -1, 2]))
