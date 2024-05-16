//슈파베이스 테스트용
const supabaseUrl = 'https://gwgwtplocxkebwuqepbd.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Z3d0cGxvY3hrZWJ3dXFlcGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMjAwMjUsImV4cCI6MjAzMDc5NjAyNX0.mYZ71l_TUW54pJnPyuufcuT8a5QoAiUcvSfwOy9IlY8";
const client = supabase.createClient(supabaseUrl, supabaseKey);
async function loadData() {
  let { data: pindata, error } = await client.from('pins').select('*');
  console.log(pindata);
  document.querySelector('#load > span:nth-of-type(1)').textContent = `장소명: ${pindata[0].building_name}`;
  document.querySelector('#load > span:nth-of-type(2)').textContent = `위도: ${pindata[0].latitude}`;
  document.querySelector('#load > span:nth-of-type(3)').textContent = `경도: ${pindata[0].longitude}`;
}
async function clickLoadData() {
  let { data: pindata, error } = await client.from('pins').select('*');
  document.querySelector('#clickLoad > span:nth-of-type(1)').textContent = `장소명: ${pindata[0].building_name}`;
  document.querySelector('#clickLoad > span:nth-of-type(2)').textContent = `위도: ${pindata[0].latitude}`;
  document.querySelector('#clickLoad > span:nth-of-type(3)').textContent = `경도: ${pindata[0].longitude}`;
}

window.addEventListener('load', loadData);
document.querySelector('#clickLoad > button').addEventListener('click', clickLoadData);