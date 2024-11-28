// app.js

// 일반적인 모듈 가져오기
// import { add, subtract } from './math.js';
// import multiply from './math.js';
// // import { multiply } from './math.js';
// // export default로 내보낸 모듈을 가져올 땐 스코프에 감싸지 않는다

// console.log(add(5, 3));      // 출력: 8
// console.log(subtract(10, 4)); // 출력: 6
// console.log(multiply(2, 3));  // 출력: 6


// // 모듈 전체 가져오기
// import * as Math from './math.js';
// // 몽땅가져와서 Math라는 객체라고 쓸게
// console.log(Math.add(2, 3)); // 출력: 5


// // 이름 변경하여 가져오기
// import { add as sum } from './math.js';
// // 상황. 원본은 유지 되는데, 데려와서 이름을 변경해서 쓰는경우
// // 원본가서 이름을 바꾸면? 그 원본을 가져다 쓰는 다른 파일이 영향을 받음
// // 문제가 커지므로 원본은 보존, 데려와서 {원본명 as 새로운이름} 라는 형식으로 변경해서 쓰면 된다. 우리집에서만 바꿔서 딴집하곤 상관없다.
// console.log(sum(2, 3)); // 출력: 5
// // console.log(add(2, 3)); // 출력: 5 // 예전 이름으로 부르지 말 것


// 일반적으로 ESM은 정적이지만 동적(비동기)으로 가져오기
async function loadModule() {
  const module = await import('./math.js');
  // 몽땅 가져와서 module이라는 객체라고 쓸게
  console.log(module.add(2, 3)); // 출력: 5
} //그걸 함수 loadModule라고 선언한다?

// 콜링 = 선언한 애 불러보겠음
loadModule();