// app.js

// 일반적인 모듈 가져오기
import { add, subtract } from './math.js';
import multiply from './math.js';

console.log(add(5, 3));      // 출력: 8
console.log(subtract(10, 4)); // 출력: 6
console.log(multiply(2, 3));  // 출력: 6


// // 모듈 전체 가져오기
// import * as Math from './math.js';
// // 몽땅가져와서 Math라는 객체라고 쓸게
// console.log(Math.add(2, 3)); // 출력: 5


// // 이름 변경하여 가져오기
// import { add as sum } from './math.js';
// console.log(sum(2, 3)); // 출력: 5


// 일반적으로 ESM은 정적이지만 동적(비동기)으로 가져오기
async function loadModule() {
  const module = await import('./math.js');
  // 몽땅 가져와서 module이라는 객체라고 쓸게
  console.log(module.add(2, 3)); // 출력: 5
} //그걸 함수 loadModule라고 선언한다?

// 콜링 = 선언한 애 불러보겠음
loadModule();