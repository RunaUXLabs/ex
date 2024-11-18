// 장바구니 초기화
const cartItems = {};
const cartDisplay = document.getElementById('cartItems');
const totalAmountDisplay = document.getElementById('totalAmount');

// 메뉴 버튼 이벤트 설정
document.querySelectorAll('.menu div').forEach((menuItem) => {
  menuItem.addEventListener('click', () => {
    const name = menuItem.getAttribute('data-name');
    const price = parseInt(menuItem.getAttribute('data-price'));

    // 장바구니에 아이템 추가 또는 갯수 증가
    if (cartItems[name]) {
      cartItems[name].count++;
    } else {
      cartItems[name] = { price, count: 1 };
    }

    // UI 업데이트
    updateCart();
  });
});

// 장바구니 업데이트 함수
function updateCart() {
  // 장바구니 UI 클리어
  cartDisplay.innerHTML = '';

  // 장바구니 항목 표시 및 총액 계산
  let total = 0;

  for (const name in cartItems) {
    const { price, count } = cartItems[name];
    total += price * count;

    // 선택메뉴 Xn    개별 총액 표시를 위한 항목 요소 생성
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item'); // 스타일링을 위한 클래스 추가

    const itemNameAndCount = document.createElement('span');
    itemNameAndCount.textContent = `${name} x${count}`;

    const itemPrice = document.createElement('span');
    itemPrice.textContent = `${(price * count).toLocaleString()}`;

    // 요소를 부모에 추가
    itemElement.appendChild(itemNameAndCount);
    itemElement.appendChild(itemPrice);
    cartDisplay.appendChild(itemElement);
  }

  // 총액 표시, 브라우저의 지역 설정에 따라 콤마를 추가하는 내장함수 사용
  totalAmountDisplay.textContent = total.toLocaleString();
}

