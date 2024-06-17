const supabaseUrl = 'https://gwgwtplocxkebwuqepbd.supabase.co';
const supabaseKey = "";
const client = supabase.createClient(supabaseUrl, supabaseKey);

async function clickLoadData() {
  let { data: pindata, error } = await client.from('pins').select('*');
  let span = document.querySelectorAll('#clickLoad > span');
  span[0].textContent = `장소명: ${pindata[pindata.length - 1].building_name}`;
  span[1].textContent = `위도: ${pindata[pindata.length - 1].latitude}`;
  span[2].textContent = `경도: ${pindata[pindata.length - 1].longitude}`;
}
async function recordHandler() {
  const { data, error } = await client.from('pins')
    .insert([
      { building_name: `${place.value}`, latitude: `${lat.value}`, longitude: `${lon.value}` },
    ])
    .select();
}
async function signInWithGithub() {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'github',
    options: {
      // redirectTo: 'https://runauxlabs.github.io/ex/html/supabaseAuth.html'
      redirectTo: 'http://127.0.0.1:5501/ex/html/supabaseAuth.html'
    }
  });
}
async function checkLogin() {
  const authInfo = await client.auth.getSession();
  const session = authInfo.data.session;
  document.querySelector("#githubLogin").style.display = "none";
  document.querySelector("#githubLogout").style.display = "none";
  if (session === null) {
    document.querySelector("#githubLogin").style.display = "flex";
  } else {
    document.querySelector("#githubLogout").style.display = "flex";
  }
}
async function signOut() {
  const { error } = await client.auth.signOut();
  checkLogin();
}

let btLoad = document.querySelector('#clickLoad > button');
btLoad.addEventListener('click', clickLoadData);
let btSave = document.querySelector('#clickSave form button');
btSave.addEventListener('click', recordHandler);

document.querySelector("#githubLogin").addEventListener('click', signInWithGithub);
document.querySelector("#githubLogout").addEventListener("click", signOut);
checkLogin();