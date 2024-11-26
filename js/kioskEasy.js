// 장바구니 데이터, 객체
const cart = {};

// HTML 요소 참조
const menu = document.querySelector("#menu");
const cartDisplay = document.querySelector("#cart");
const totalDisplay = document.querySelector("#total");

// 메뉴 버튼 클릭 이벤트 추가
menu.addEventListener("click", (event) => {
  // 버튼 세개가 담겨있는 메뉴를 클릭했는데, 
  // 니가 클릭한 그 위치(타겟)가 버튼이면 통과
  if (event.target.tagName === "BUTTON") {
    const name = event.target.getAttribute("data-name");
    // 그 타겟의 속성(data-name)좀 떼와, name에 할당해
    const price = event.target.getAttribute("data-price");
    // 그 타겟의 속성(data-price)좀 떼와, price에 할당해


    // 장바구니 추가 또는 수량 증가, 삼항연산자 버전
    // cart[name] = cart[name] ? { price, count: cart[name].count + 1 } : { price, count: 1 };
    // 장바구니에 추가하거나 수량 증가, if문 버전

    // 객체 접근법: 1. 점표기법(객체명.키이름) 2. 대괄호표기법(객체명[키이름])
    // 예시) cart.coffee   cart[coffee]    
    // 위에 선언된 cart라는 객체에 접근을 할거야(초기값은 텅)
    // 카트 현상황이 뭔지 모르겠으나, 내가 버튼을 눌러서 카트에 같은상품이 있으면 갯수를 늘려주고 없으면 1개라고 표기해줘
    if (cart[name]) { cart[name].count++; }
    else { cart[name] = { price, count: 1 }; }

    // UI 업데이트
    updateCart(); // 외부에 선언된 함수콜링
    console.log(cart);// 카트 현상태 보여줘
  }
});

// 장바구니와 총액 업데이트
function updateCart() {
  cartDisplay.innerHTML = ""; // 변수 cartDisplay의 자식 태그구성을 공백으로 초기화
  let total = 0; // 총금액은 0 이다

  // for in 구문,  객체 안에서만 노는 반복문
  // 번외편) for of 구문, 배열 안에서만 노는 반복문
  // cart라는 객체 안에서만 놀건데, 각 덩어리(메뉴)를 name이라는 변수로 부를게
  for (const name in cart) {
    const { price, count } = cart[name];
    // 구조 분해 할당을 함, 오른쪽의 값을 왼쪽의 구성으로 해체쇼
    // 값이 두개가 들어있는 상태라서 price와 count에 각각 할당
    total += price * count; // 계산해서, total에 누적할당해줘

    const item = document.createElement("div");
    // 쌩 div만들어서 item이라고 할게
    // 그 item에 글씨만 넣어줘.textContent

    item.textContent = `${name} x${count} (${(price * count).toLocaleString()}원)`;
    // .toLocaleString() 라는 메서드는 문화권에 대응해서 우리나라 3자리수 콤마를 넣을하는 함수
    cartDisplay.appendChild(item);
    // .appendChild(item) 미리만들어 둔 cartDisplay에 item을 자식으로 추가해줘
  }

  totalDisplay.textContent = total.toLocaleString();
  // 미리만들어둔 totalDisplay에 세자리콤마 금액을 글씨만 똑 떼어 넣어줘
}
