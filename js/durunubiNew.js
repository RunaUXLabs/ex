// durunubiNew

// Swiper 객체 초기화
var banner = new Swiper("#banner", {
	slidesPerView: 1,
	pagination: {
		el: ".swiper-pagination",
		type: "fraction",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	loop: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
});


// 탭설정 함수
const setupTabs = (buttonSelector, contentSelector, activeClass = "on") => {
	const buttons = document.querySelectorAll(buttonSelector);
	const contents = document.querySelectorAll(contentSelector);

	buttons.forEach((button, index) => {
		button.addEventListener("click", () => {
			buttons.forEach((btn, i) => {
				btn.classList.remove(activeClass);
				contents[i].classList.remove(activeClass);
			});
			button.classList.add(activeClass);
			contents[index].classList.add(activeClass);
		});
	});

	buttons[0].click(); // 초기화
};
// 길종류검색 탭구조
setupTabs("#roadSearch > button", "#roadResult > div");
// 해파랑/남파랑/서해랑길 탭구조
setupTabs("#roadButtons > h2", "#roadList > div");


// 한국관광공사 두루누비 API
const serviceKey = 'Iv76qim5Ny6HUJz794fWsPnAJ%2BwHb%2BsdheosUWgR8rbILCn7M9L6zNFDr%2FHWJtuGhpLXdiP%2FfvROWpDUW7Zupg%3D%3D'; // API인증키
const createAPIUrl = (roadName, serviceKey) => {
	return `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${serviceKey}&_type=json&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&crsKorNm=${encodeURIComponent(roadName)}&routeIdx=%20&brdDiv=DNWW`;
};

const publicAPIurl = [
	createAPIUrl("해파랑길", serviceKey),
	createAPIUrl("남파랑길", serviceKey),
	createAPIUrl("서해랑길", serviceKey),
];


// 랜덤 숫자 생성함수(뽑을 갯수, 최대값(배열길이), 중복여부)
const generateRandomNumbers = (n, max, unique = false) => {
	const numList = unique ? new Set() : [];
	while (unique ? numList.size < n : numList.length < n) {
		const randomNum = Math.floor(Math.random() * max);
		unique ? numList.add(randomNum) : numList.push(randomNum);
	}
	return [...numList];
};
// 간단한 클래스 토글 함수
const toggleClass = (selector, className, add = true) => {
	const elements = document.querySelectorAll(selector);
	elements.forEach(element => {
		add ? element.classList.add(className) : element.classList.remove(className);
	});
};
// 요소생성하여 내용과 클래스명 넣는 함수
function createElementWithText(tag, text, className) {
	const element = document.createElement(tag);
	if (className) element.classList.add(className);
	if (text) {
		const textNode = document.createTextNode(text);
		element.appendChild(textNode);
	}
	return element;
}


// 3개 길 코스정보 추출 추천걷기길 카드정 만들기(num = 0:해파랑, 1:남파랑, 2:서해랑)
const getInfo = async (num) => {
	try {
		const response = await fetch(publicAPIurl[num]);
		if (!response.ok) {
			console.error(`Error: ${response.status} - ${response.statusText}`);
			return;
		}
		const json = await response.json();
		let data = json.response.body.items.item;
		// console.log(data);

		// 해당길 인덱스번호 입력하여 길 추출하여 정보구분, 예) 해파랑길 1코스 => index = 1
		var crs = (index) => data[index]; // 해당길의 인덱스별 길정보 반환하여 특정
		let crsName = (index) => crs(index)['crsKorNm']; // 특정길 코스명
		let crsDistance = (index) => `${crs(index)['crsDstnc']} km`;  // 특정길 거리
		// 특정길 소요시간 mmmm분 => h시간 mm분으로 가공
		let crsHourWithMin = (index) => {
			const totalMinutes = Number(crs(index)['crsTotlRqrmHour']); // 소요시간(분)
			const hours = Math.floor(totalMinutes / 60); // 시간 계산
			const minutes = totalMinutes % 60; // 분 계산

			// 시간과 분을 조합하여 반환
			return hours > 0
				? minutes > 0
					? `${hours}시간 ${minutes}분`
					: `${hours}시간`
				: `${minutes}분`;
		};
		// crsLevel 코스레벨
		let crsLevel = (index) => {
			let level = crs(index)['crsLevel'];
			let result = '';
			if (level == 1) result = '쉬움';
			if (level == 2) result = '보통';
			if (level == 3) result = '어려움';
			return result;
		};
		let crsArea = (index) => crs(index)['sigun']; // 특정길 코스위치
		// 특정길 코스정보 요약(데이터에 있는 <br> 태그와 하이픈(-) 제거)
		let crsSummary = (index) => {
			let summary = crs(index)['crsSummary'];
			return summary.replace(/<br\s*\/?>(\s*-\s*)?|-/gi, '');
		};

		// 각 길정보 데이터 디스턱쳐링
		function createRecomandRoad(index) {
			const a = document.createElement('a');

			// 상단의 num 번호에 따라 걷기길 분류되니, 그에 따라 클래스 이름변경
			if (num === 0) a.classList.add(`hae`, `hae${index}`);
			else if (num === 1) a.classList.add(`nam`, `nam${index}`);
			else if (num === 2) a.classList.add(`seo`, `seo${index}`);

			// 길상세 정보 뱃지
			const road = document.createElement('div');
			road.classList.add('road');
			road.append(
				createElementWithText('span', crsDistance(index)),
				createElementWithText('span', crsHourWithMin(index)),
				createElementWithText('span', crsLevel(index))
			);
			a.appendChild(road);

			// 길 전체 정보
			a.append(
				createElementWithText('span', crsArea(index), 'area'),
				createElementWithText('h4', crsName(index)),
				createElementWithText('span', crsSummary(index), 'summary')
			);

			// 만들어진 카드 html에 추가
			const block = document.querySelector('.recomandRoad');
			block.appendChild(a);
		}

		// 각 길마다 5개씩 랜덤추첨(중복허용)
		const uniqueRandom = generateRandomNumbers(5, 10, true);
		for (const index of uniqueRandom) createRecomandRoad(index);

	} catch (error) {
		console.error("data fetch 실패:", error);
	}
};

// 각 길정보 추출하여 카드 만들기
const getRecomandRoad = async () => {
	// 0:해파랑, 1:남파랑, 2:서해랑 중 세번뽑기 (중복허용)
	const randomCard = generateRandomNumbers(3, 3);
	await Promise.all(randomCard.map(num => getInfo(num)));

	// 카드 다 출력되면 css로 .recomandRoad 안의 로티파일 제거하기
	toggleClass('.recomandRoad', 'on');
};
getRecomandRoad();