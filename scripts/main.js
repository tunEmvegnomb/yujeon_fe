function payload_dat_get() {
  const payload = JSON.parse(localStorage.getItem("payload"));
  const nickname = payload.nickname;
  console.log(nickname);
  html = `${nickname}님 환영합니다.`;
  document.getElementById("welcome_user").innerHTML = html;
}

payload_data_get();
