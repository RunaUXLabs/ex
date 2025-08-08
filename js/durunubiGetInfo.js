/**
 * API 및 애플리케이션 설정
 * 이 파일은 두루누비 걷기길 정보를 가져오고, 추천 코스를 생성하는 데 필요한 설정을 포함합니다.
 */
export const config = {
  swiper: {
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
  },
  roads: 3, // 길 종류(해파랑, 남파랑, 서해랑)
  recommendRoadCount: 3, // 뽑을 길의 수
  maxCounts: [50, 90, 109], // 0:해파랑, 1:남파랑, 2:서해랑 각 길마다 최대 코스 수, 서해랑 길은 109개이나 100번이후 데이터가 온전치 않음
  recommendCourseCount: 5, // 각 길마다 추천할 코스 수
  api: {
    serviceKey: 'Iv76qim5Ny6HUJz794fWsPnAJ%2BwHb%2BsdheosUWgR8rbILCn7M9L6zNFDr%2FHWJtuGhpLXdiP%2FfvROWpDUW7Zupg%3D%3D',
    baseUrl: 'https://apis.data.go.kr/B551011/Durunubi/courseList',
    roadNames: ['해파랑길', '남파랑길', '서해랑길'],
    createAPIUrl(roadName) {
      return `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${this.serviceKey}&_type=json&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&crsKorNm=${encodeURIComponent(roadName)}&routeIdx=%20&brdDiv=DNWW`;
    },
  },
};
// 두루누비 API URL
const publicAPIurl = [
  config.api.createAPIUrl(config.api.roadNames[0]),
  config.api.createAPIUrl(config.api.roadNames[1]),
  config.api.createAPIUrl(config.api.roadNames[2]),
];

/**
 * 텍스트를 포함한 HTML 요소를 생성하는 함수
 * @param {string} tag - 생성할 HTML 태그 이름
 * @param {string} text - 요소에 추가할 텍스트 내용
 * @param {string} [className] - 요소에 추가할 클래스 이름
 * @returns {HTMLElement} 생성된 HTML 요소
 */
const createElementWithText = (tag, text, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) {
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }
  return element;
};

/**
 * 랜덤 숫자 생성 함수
 * @param {number} n - 생성할 숫자의 개수
 * @param {number} max - 생성할 숫자의 최대값
 * @param {boolean} unique - 중복 허용 여부
 * @returns {number[]} 생성된 랜덤 숫자 배열
 */
export const generateRandomNumbers = (n, max, unique = false) => {
  const numList = unique ? new Set() : [];
  while (unique ? numList.size < n : numList.length < n) {
    const randomNum = Math.floor(Math.random() * max);
    unique ? numList.add(randomNum) : numList.push(randomNum);
  }
  return [...numList];
};

/**
 * 3개 길 코스정보 추출 추천걷기길 카드정보 만들기
 * @param {*} num - 길 분류번호(0:해파랑, 1:남파랑, 2:서해랑)
 * @param {*} max - 해당길의 최대 코스 수
 * @returns 
 */
export const getInfo = async (num, max) => {
  try {
    const response = await fetch(publicAPIurl[num]);
    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    const json = await response.json();
    let data = json.response.body.items.item;
    // console.log(data);

    /**
     * 안전하게 객체 속성 값을 가져오는 함수
     * @param {Object} obj - 대상 객체
     * @param {string} key - 가져올 속성 키
     * @param {any} defaultValue - 기본값
     * @returns {any} 속성 값 또는 기본값
     */
    const getSafeValue = (obj, key, defaultValue = '정보 없음') => {
      return obj && obj[key] ? obj[key] : defaultValue;
    };

    /**
     * 추천길 카드 생성 함수
     * @param {number} index - 도출된 해당길 JSON data 인덱스번호
     */
    const createRecomandRoad = (index) => {
      const course = data[index]; // 해당길의 인덱스별 길정보 반환하여 특정
      const name = getSafeValue(course, 'crsKorNm', ''); // 특정길 코스명

      // 코스 이름(crsKorNm)이 없으면 카드 생성을 건너뜀
      if (!name) {
        console.log(`[정보] 인덱스 ${index}번 카드는 코스 이름이 없어 카드 생성을 건너뜁니다.`);
        return;
      }

      // --- 유효한 데이터로 카드 생성 시작 ---
      const a = document.createElement('a');

      // 상단의 num 번호에 따라 걷기길 분류되니, 그에 따라 클래스 이름변경
      if (num === 0) a.classList.add(`hae`);
      else if (num === 1) a.classList.add(`nam`);
      else if (num === 2) a.classList.add(`seo`);

      // 거리 정보
      const distance = `${getSafeValue(course, 'crsDstnc', '?')} km`;

      // 소요 시간 정보, mmmm분 => h시간 mm분으로 가공
      const totalMinutes = Number(getSafeValue(course, 'crsTotlRqrmHour', 0));
      let hourWithMin = '정보 없음';
      if (!isNaN(totalMinutes) && totalMinutes > 0) {
        const hours = Math.floor(totalMinutes / 60); // 시간 계산
        const minutes = totalMinutes % 60; // 분 계산
        // 시간과 분을 조합하여 반환
        if (hours > 0) {
          hourWithMin = minutes > 0 ? `${hours}시간 ${minutes}분` : `${hours}시간`;
        } else {
          hourWithMin = `${minutes}분`;
        }
      }

      // 난이도 정보
      const levelCode = getSafeValue(course, 'crsLevel', 0);
      let levelText = '정보 없음';
      if (levelCode == 1) levelText = '쉬움';
      else if (levelCode == 2) levelText = '보통';
      else if (levelCode == 3) levelText = '어려움';

      // 지역 정보
      const area = getSafeValue(course, 'sigun');

      // 특정길 코스정보 요약(데이터에 있는 <br> 태그와 하이픈(-) 제거)
      const summaryRaw = getSafeValue(course, 'crsSummary');
      const summary = summaryRaw.replace(/<br\s*\/?>(\s*-\s*)?|-/gi, '');

      // 카드 DOM 생성, 각 정보 배치
      const road = document.createElement('div');
      road.classList.add('road');
      road.append(
        createElementWithText('span', distance),
        createElementWithText('span', hourWithMin),
        createElementWithText('span', levelText)
      );
      a.appendChild(road);

      a.append(
        createElementWithText('span', area, 'area'),
        createElementWithText('h4', name),
        createElementWithText('span', summary, 'summary')
      );

      document.querySelector('.recomandRoad').appendChild(a);
    };

    // 각 길마다 5개씩 랜덤추첨(중복허용)
    const uniqueRandom = generateRandomNumbers(config.recommendCourseCount, max, true);
    console.log(`길 종류 ${num}에서 코스 데이터 [${uniqueRandom}] 뽑음`);
    for (const index of uniqueRandom) createRecomandRoad(index);

  } catch (error) {
    console.error("data fetch 실패:", error);
    recomendRoadContainer.textContent = `걷기길 정보를 불러오는 데 실패했습니다.`;
  }
};