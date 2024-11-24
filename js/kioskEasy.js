// 장바구니 데이터
const cart = {};

// HTML 요소 참조
const menu = document.querySelector("#menu");
const cartDisplay = document.querySelector("#cart");
const totalDisplay = document.querySelector("#total");

// 메뉴 버튼 클릭 이벤트 추가
menu.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const name = event.target.getAttribute("data-name");
    const price = parseInt(event.target.getAttribute("data-price"));

    // 장바구니 추가 또는 수량 증가, 삼항연산자 버전
    // cart[name] = cart[name] ? { price, count: cart[name].count + 1 } : { price, count: 1 };
    // 장바구니에 추가하거나 수량 증가, if문 버전
    if (cart[name]) { cart[name].count++; }
    else { cart[name] = { price, count: 1 }; }

    // UI 업데이트
    updateCart();
    console.log(cart);
  }
});

// 장바구니와 총액 업데이트
function updateCart() {
  cartDisplay.innerHTML = "";
  let total = 0;

  for (const name in cart) {
    const { price, count } = cart[name];
    total += price * count;

    const item = document.createElement("div");
    item.textContent = `${name} x${count} (${(price * count).toLocaleString()}원)`;
    cartDisplay.appendChild(item);
  }

  totalDisplay.textContent = total.toLocaleString();
}
