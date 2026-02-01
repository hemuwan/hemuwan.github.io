document.getElementById('app').innerHTML = "hie"

fetch('/auth/jwt').then(response => response.json().then(data => {
  const { token } = data;
  document.getElementById('app').innerText = token;
}));