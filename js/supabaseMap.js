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

  for (const iterator of pindata) {
    let pin = new MakePin(iterator["building_name"], iterator["latitude"], iterator["longitude"],
      iterator["street_address"], iterator["desciption"], iterator["writer"]);
    pins.push(pin);
  }
  for (const pin of pins) {
    // console.log(pin);
    let maker = new kakao.maps.Marker({
      map: baseMap,
      position: pin.position
    });
    let content = `
    <div class="overlayInfo">
      <div class="title">
        <span>${pin.name}</span>
        <button onclick="closeOverlay()">X</button>
      </div>
      <div class="content">
      </div
    </div>`;
    // 오버레이 생성
    let overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: baseMap,
      position: pin.position
    });
    markers.push(maker);
    markers.push(overlay);
    // 오버레이 닫기함수
    function closeOverlay() {
      overlay.setMap(null);
    }
  }
  pinClusterer.addMarkers(markers);
  // 마커를 클릭 했을 때, 커스텀 오버레이 표시
  kakao.maps.event.addListener(markers, 'click', function () {
    overlay.setMap(baseMap);
  });
  // console.log(markers);
  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 



}
window.addEventListener('load', loadData);