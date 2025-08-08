// durunubiNew
import { config, generateRandomNumbers, getInfo } from "/ex/js/durunubiGetInfo.js";

/**
 * 탭 UI를 설정하는 함수 (이벤트 위임 사용)
 * @param {string} containerSelector - 탭 버튼들을 감싸는 부모 요소의 선택자
 * @param {string} buttonSelector - 탭 버튼의 선택자
 * @param {string} contentSelector - 탭 콘텐츠의 선택자
 * @param {string} [activeClass="on"] - 활성 상태를 나타내는 클래스 이름
 */
const setupTabs = (containerSelector, buttonSelector, contentSelector, activeClass = "on") => {
	const container = document.querySelector(containerSelector);
	const contents = document.querySelectorAll(contentSelector);

	if (!container || contents.length === 0) return;

	const buttons = container.querySelectorAll(buttonSelector);

	container.addEventListener('click', (event) => {
		const targetButton = event.target.closest(buttonSelector);
		// 클릭된 요소(event.target)에서부터 부모 방향으로 올라가면서, buttonSelector에 해당하는 가장 가까운 버튼 요소를 찾음.
		// 실제로 클릭된 것이 버튼이 아니더라도, 버튼 내부의 자식 요소를 클릭했을 때도 버튼을 올바르게 찾게됨.
		if (!targetButton || !container.contains(targetButton)) return; // 함수를 바로 종료(return)

		const index = Array.from(buttons).indexOf(targetButton);
		// Array.prototype.indexOf() 또는 Array.from(...).indexOf(...)를 사용하면, 찾는 값이 없을 때 -1을 반환

		if (index !== -1) {
			buttons.forEach((btn, i) => {
				btn.classList.remove(activeClass);
				contents[i]?.classList.remove(activeClass);
				// ?. 옵셔널체이닝, contents[i]가 undefined 또는 null이 아니면, classList.remove(activeClass)를 실행
			});
			targetButton.classList.add(activeClass);
			contents[index]?.classList.add(activeClass);
		}
	});
	// 초기 상태 설정: 첫 번째 탭 활성화
	buttons[0]?.click();
};

/**
 * 간단한 클래스 토글 함수
 * @param {string} selector - 대상 요소를 선택할 CSS 선택자
 * @param {string} className - 토글할 클래스 이름
 * @param {boolean} add - true이면 클래스 추가, false이면 제거
 */
const toggleClass = (selector, className, add = true) => {
	const elements = document.querySelectorAll(selector);
	elements.forEach(element => {
		add ? element.classList.add(className) : element.classList.remove(className);
	});
};


// 각 길정보 추출하여 카드 만들기
const getRecomandRoad = async () => {
	// 0:해파랑, 1:남파랑, 2:서해랑 중 세번뽑기 (중복허용)
	const randomCard = generateRandomNumbers(config.recommendRoadCount, config.roads);
	await Promise.all(randomCard.map(num => getInfo(num, config.maxCounts[num])));

	// 카드 다 출력되면 css로 .recomandRoad 안의 로티파일 제거하기
	toggleClass('.recomandRoad', 'on');
};

/** * 애플리케이션 초기화 함수 */
const init = async () => {
	// Swiper 초기화
	new Swiper("#banner", config.swiper);
	// 탭 UI 설정
	setupTabs("#roadSearch", "#roadSearch > button", "#roadResult > div"); // 길종류검색 탭
	setupTabs("#roadButtons", "#roadButtons > h2", "#roadList > div"); // 해파랑/남파랑/서해랑길 탭
	// 추천 걷기길 정보 가져오기 및 표시
	getRecomandRoad();
};

// DOM이 준비되면 애플리케이션 실행
document.addEventListener('DOMContentLoaded', init);