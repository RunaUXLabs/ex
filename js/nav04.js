// 퍼블용 딸깍이
const GNB = document.querySelector('nav');
let menuButton = document.querySelector('.icoMenu');
menuButton.addEventListener('click', function () {
  GNB.classList.toggle("active");
  // nav에 active 토글
  this.textContent = this.textContent === 'close' ? 'menu' : 'close';
  // 삼항연산자 사용하여 텍스트 변경, 아이콘의 모습이 바뀐다 
});

// 반응형 모바일에서 대메뉴 a를 클릭시, 링크기능 막고 하위메뉴 펼치기
let responsive = true;
window.addEventListener('resize', () => {
  let iw = window.innerWidth;
  let depth01 = document.querySelector('.menu > li > a');
  if (iw < 1024 && responsive) {
    depth01.addEventListener('click', function (e) {
      e.preventDefault(); // 기본기능 막기
    });
  } else {
    responsive = false;
  }
});