// 퍼블용 딸깍이
const GNB = document.querySelector('nav');
let menuButton = document.querySelector('.icoMenu');
menuButton.addEventListener('click', function () {
  GNB.classList.toggle("active");
  // nav에 active 토글
  this.textContent = this.textContent === 'close' ? 'menu' : 'close';
  // 삼항연산자 사용하여 텍스트 변경, 아이콘의 모습이 바뀐다 
});

// 아코디언구조
let depth01All = document.querySelectorAll('ul.menu > li > a');
// 아코디언 함수
let collapse = element => {
  let alreadyActive = document.querySelector(".sub_menu.active");
  // 기존에 활성화된 depth01의 하위메뉴 변수선언
  let notThis = alreadyActive !== element;
  // 기존에 활성화된 depth01이 내가 누르지 않은 경우 변수선언

  if (notThis) {
    // 닫혀있는 depth01을 누른경우, 모든 대상에서 active제거 후
    for (const depth01 of [...depth01All]) {
      depth01.classList.remove("active");
      depth01.nextElementSibling.classList.remove("active");
    }
    // .sub_menu에  active
    element.nextElementSibling.classList.add("active");
  } else {
    // 열어놓은 depth01을 또 누른경우, 누른대상의 형제(.sub_menu)에 active 제거
    element.nextElementSibling.classList.remove("active");
  }
};
// 반응형 콜링함수
let underRes = () => {
  for (const depth01 of [...depth01All]) {
    depth01.addEventListener('click', function (e) {
      e.preventDefault(); // 기본기능 막기
      collapse(this);
    });
  };
};

// 반응형 모바일에서 대메뉴 a를 클릭시, 링크기능 막고 아코디언처럼 펼치기
window.addEventListener('resize', () => {
  let iw = window.innerWidth;
  if (iw < 1024) underRes();
});
// 최초로딩시 조건
let iw = window.innerWidth;
if (iw < 1024) underRes();

