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
    constructor(name, lat, long) {
      this.name = name;
      this.position = new kakao.maps.LatLng(lat, long);
    }
  }
  let pins = [];
  let markers = [];
  for (const iterator of pindata) {
    let pin = new MakePin(iterator["building_name"], iterator["latitude"], iterator["longitude"]);
    pins.push(pin);
  }
  for (const pin of pins) {
    let maker = new kakao.maps.Marker({
      map: baseMap,
      position: pin.position
    });
    markers.push(maker);
  }
  pinClusterer.addMarkers(markers);
}
window.addEventListener('load', loadData);