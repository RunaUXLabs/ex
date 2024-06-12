const supabaseUrl = 'https://gwgwtplocxkebwuqepbd.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z3d0cGxvY3hrZWJ3dXFlcGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMjAwMjUsImV4cCI6MjAzMDc5NjAyNX0.mYZ71l_TUW54pJnPyuufcuT8a5QoAiUcvSfwOy9IlY8";
const baseLat = 36.634997, baseLong = 127.4577953;
const client = supabase.createClient(supabaseUrl, supabaseKey);

async function loadData() {
  let { data: pindata, error } = await client.from('pins').select('*');
  // console.log(pindata);
  let mapBox = document.querySelector('#map');
  let mapOption = {
    center: new kakao.maps.LatLng(baseLat, baseLong),
    level: 6
  };
  let baseMap = new kakao.maps.Map(mapBox, mapOption);

  // 클러스터러 설정
  let clustererOption = {
    map: baseMap,
    averageCenter: true,
    minLevel: 6
  };
  let pinClusterer = new kakao.maps.MarkerClusterer(clustererOption);

  class MakePin {
    constructor(name, lat, long, street, address, desc, writer) {
      this.name = name;
      this.position = new kakao.maps.LatLng(lat, long);
      this.street = street;
      this.address = address;
      this.desc = desc;
      this.writer = writer;
    }
  }
  let pins = [];
  let markers = [];

  // DB기준 핀생성
  for (const iterator of pindata) {
    let pin = new MakePin(iterator["building_name"], iterator["latitude"], iterator["longitude"],
      iterator["street_address"], iterator["desciption"], iterator["writer"]);
    // 핀모음 배열에 추가
    pins.push(pin);
  }
  // 핀배열기준 마커와 오버레이 생성
  for (const pin of pins) {
    // console.log(pin);
    let newMarker = new kakao.maps.Marker({
      map: baseMap,
      position: pin.position
    });
    // 오버레이 컨텐츠 구성
    let content = `
      <div class="overlayInfo">
        <div class="title">${pin.name}</div>
        <div class="content">
        </div>
      </div>
    `;
    let newOverlay = new kakao.maps.CustomOverlay({
      content: content,
      position: newMarker.getPosition(),
      state: false
    });

    // 마커를 클릭시 커스텀 오버레이 토글
    kakao.maps.event.addListener(newMarker, 'click', function () {
      if (!newOverlay.state) {
        newOverlay.setMap(baseMap);
        newOverlay.state = true;
      } else {
        newOverlay.setMap(null);
        newOverlay.state = false;
      }
    });

    // 마커배열에 추가
    markers.push(newMarker);
  }
  // 마커배열 기준으로 클러스터러 구성
  pinClusterer.addMarkers(markers);
}
window.addEventListener('load', loadData);