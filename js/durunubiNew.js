// durunubiNew

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


// 길종류검색 탭구조
let roadSearchButtons = document.querySelectorAll('#roadSearch > button');
Array.from(roadSearchButtons).forEach((eachButton, index) => {
	eachButton.addEventListener('click', function () {
		let tabBoxs = document.querySelectorAll('#roadResult > div');
		for (var i = 0; i < tabBoxs.length; i++) {
			tabBoxs[i].classList.remove("on");
			roadSearchButtons[i].classList.remove("on");
		}
		tabBoxs[index].classList.add("on");
		this.classList.add("on");
	});
});
roadSearchButtons[0].click();

// 해파랑/남파랑/서해랑길 탭구조
let roadButtons = document.querySelectorAll('#roadButtons > h2');
Array.from(roadButtons).forEach((eachButton, index) => {
	eachButton.addEventListener('click', function () {
		let roadLists = document.querySelectorAll('#roadList > div');
		let tabLinks = document.querySelectorAll('#roadButtons > a');
		for (var i = 0; i < roadLists.length; i++) {
			roadLists[i].classList.remove("on");
			roadButtons[i].classList.remove("on");
			tabLinks[i].classList.remove("on");
		}
		roadLists[index].classList.add("on");
		tabLinks[index].classList.add("on");
		this.classList.add("on");
	});
});
roadButtons[0].click();

// 한국관광공사 두루누비 API
const serviceKey = ''; // API인증키
const haeRoad = encodeURIComponent(`해파랑길`); //%ED%95%B4%ED%8C%8C%EB%9E%91%EA%B8%B8
const namRoad = encodeURIComponent(`남파랑길`); //%EB%82%A8%ED%8C%8C%EB%9E%91%EA%B8%B8
const seoRoad = encodeURIComponent(`서해랑길`); //%EC%84%9C%ED%95%B4%EB%9E%91%EA%B8%B8

// 개인계정의 인증키로 활성화된 API입력
const publicAPIurl1 = `https://apis.data.go.kr/B551011/Durunubi/courseList?numOfRows=11&pageNo=1&MobileOS=ETC&MobileApp=Test&serviceKey=${serviceKey}&_type=json&crsKorNm=${haeRoad}&brdDiv=DNWW`;
const publicAPIurl2 = `https://apis.data.go.kr/B551011/Durunubi/courseList?numOfRows=11&pageNo=1&MobileOS=ETC&MobileApp=Test&serviceKey=${serviceKey}&_type=json&crsKorNm=${namRoad}&brdDiv=DNWW`;
const publicAPIurl3 = `https://apis.data.go.kr/B551011/Durunubi/courseList?numOfRows=11&pageNo=1&MobileOS=ETC&MobileApp=Test&serviceKey=gptlfeF0tckKWZugnRmyvS4wuIp7K2dDyLC9SjDzp%2BIk8HEEiN8OH9m9Xm1%2BH%2FIvBWPxcRBQ8mhpUGvA9n9yVA%3D%3D&_type=json&crsKorNm=%EC%84%9C%ED%95%B4%EB%9E%91%EA%B8%B8&brdDiv=DNWW`;

const publicAPIurl = [publicAPIurl1, publicAPIurl2, publicAPIurl3];

// json
// https://apis.data.go.kr/B551011/Durunubi/courseList?numOfRows=11&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=서비스키_type=json&crsKorNm=%ED%95%B4%ED%8C%8C%EB%9E%91%EA%B8%B8&brdDiv=DNWW


// 3개 길 코스정보 추출 추천걷기길 카드 만들기
const getInfo = async (num) => {
	await fetch(`${publicAPIurl[num]}`).then((response) => response.json()).then((json) => {
		let data = json.response.body.items.item;

		// 해당길 인덱스번호 입력하여 길 추출하여 정보구분, 예) 해파랑길 1코스 => index = 1
		var crs = (index) => data[index]; // 해당길의 인덱스별 길정보 반환하여 특정
		let crsName = (index) => crs(index)['crsKorNm']; // 특정길 코스명
		let crsDistance = (index) => `${crs(index)['crsDstnc']} km`;  // 특정길 거리
		// 특정길 소요시간 mmmm분 => h시간 mm분으로 가공
		let crsHourWithMin = (index) => {
			let crsTimeMinute = (index) => Number(crs(index)['crsTotlRqrmHour']); // 소요시간(분)
			// console.log(crsTimeMinute(index));
			let crsTimeHour = (crsTimeMinute(index) / 60).toFixed(2); // 소요시간(h.mm)
			let result = '';
			for (i = 0; i < crsTimeHour.length; i++) {
				arr = [crsTimeHour.charAt(crsTimeHour.length - (i + 1))]; // for구문을 통해 반복하여 역순으로 배열채우기
				arr = arr.filter((element) => element !== '.'); // 소수점 삭제
				str = '';
				if (arr != '') str += arr;
				if (i == 3) str += '시간 ';
				if (i == 0) str += '분';
				result = str + result;
			}
			// 00분 일 경우 시간만 나올수 있도록 제거
			let zeroComma = result.search(/00/gi); // 천억단위에서 0값 및 콤마찾기, 있으면 index 반환
			if (zeroComma > 0) result = result.replace('00분', '');
			return result;
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
		let crsArea = (index) => crs(index)['sigun'];  // 특정길 코스위치
		let crsSummary = (index) => crs(index)['crsSummary'];  // 특정길 코스정보 요약

		// 각 길정보 데이터 디스트럭처링
		function createRecomandRoad(index) {
			var a = document.createElement('a');
			// 상단의 num 번호에 따라 걷기길 분류되니, 그에 따라 클래스 이름변경
			if (num == 0) a.classList.add(`hae`, `hae${index}`);
			else if (num == 1) a.classList.add(`nam`, `nam${index}`);
			else if (num == 2) a.classList.add(`seo`, `seo${index}`);

			// 거리/시간/난이도
			function makeRoadInfo(index) {
				var road = document.createElement('div');
				let spanDistance = document.createElement('span');
				let spanTime = document.createElement('span');
				let spanLevel = document.createElement('span');
				let spanDistanceTxt = document.createTextNode(crsDistance(index));
				let spanTimeTxt = document.createTextNode(crsHourWithMin(index));
				let spanLevelTxt = document.createTextNode(crsLevel(index));

				spanDistance.appendChild(spanDistanceTxt);
				spanTime.appendChild(spanTimeTxt);
				spanLevel.appendChild(spanLevelTxt);

				road.appendChild(spanDistance);
				road.appendChild(spanTime);
				road.appendChild(spanLevel);
				road.classList.add('road');

				a.appendChild(road);
			}
			// 나머지
			function makeBottomInfo(index) {
				let area = document.createElement('span');
				let h4 = document.createElement('h4');
				let summary = document.createElement('span');
				area.classList.add('area');
				summary.classList.add('summary');

				let areaTxt = document.createTextNode(crsArea(index));
				let h4Txt = document.createTextNode(crsName(index));
				let summaryTxt = document.createTextNode(crsSummary(index));

				area.appendChild(areaTxt);
				h4.appendChild(h4Txt);
				summary.appendChild(summaryTxt);


				a.appendChild(area);
				a.appendChild(h4);
				a.appendChild(summary);
			}
			makeRoadInfo(index);
			makeBottomInfo(index);

			// 추천길을 a에 집어넣기
			let block = document.querySelector(".recomandRoad");
			block.appendChild(a);
		};
		// 각 길 랜덤추첨
		let random = [...randomNum(5)];
		console.log(random);
		for (const index of random) createRecomandRoad(index);
	});
};

// 0:해파랑, 1:남파랑, 2:서해랑 중 10번 숫자뽑기
const randomNum123 = (n) => {
	let numList = [];
	while (numList.length < n) numList.push(Math.floor(Math.random() * 3)); // +1 안함
	return numList;
};

// 중복없는랜덤숫자뽑기
const randomNum = (n) => {
	let numList = new Set();
	while (numList.size < n) numList.add(Math.floor(Math.random() * 10) + 1);
	return numList;
};

// fetch API, async/await 여러개 연결하기
const getRecomandRoad = async () => {
	// 랜덤카드 15장뽑기
	let randomCard = randomNum123(3);
	console.log(randomCard);
	for (const num of randomCard) await getInfo(num);

	// 카드 다 출력되면 css로 .recomandRoad 안의 로티파일 제거하기
	const recomandRoad = document.querySelector('.recomandRoad');
	recomandRoad.classList.add('on');
};
getRecomandRoad();