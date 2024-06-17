const supabaseUrl = 'https://gwgwtplocxkebwuqepbd.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z3d0cGxvY3hrZWJ3dXFlcGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMjAwMjUsImV4cCI6MjAzMDc5NjAyNX0.mYZ71l_TUW54pJnPyuufcuT8a5QoAiUcvSfwOy9IlY8";
const client = supabase.createClient(supabaseUrl, supabaseKey);
async function loadData() {
  let { data: pindata, error } = await client.from('pins').select('*');
  console.log(pindata);
  let span = document.querySelectorAll('#load > span');
  span[0].textContent = `장소명: ${pindata[pindata.length - 1].building_name}`;
  span[1].textContent = `위도: ${pindata[pindata.length - 1].latitude}`;
  span[2].textContent = `경도: ${pindata[pindata.length - 1].longitude}`;
}
async function clickLoadData() {
  let { data: pindata, error } = await client.from('pins').select('*');
  let span = document.querySelectorAll('#clickLoad > span');
  span[0].textContent = `장소명: ${pindata[pindata.length - 1].building_name}`;
  span[1].textContent = `위도: ${pindata[pindata.length - 1].latitude}`;
  span[2].textContent = `경도: ${pindata[pindata.length - 1].longitude}`;
}

window.addEventListener('load', loadData);
let btLoad = document.querySelector('#clickLoad > button');
btLoad.addEventListener('click', clickLoadData);
