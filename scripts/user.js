function login_button_click() {
  document.getElementById("login_modal").style.display = "flex";
}

document.getElementById("login_button").onclick = () => {
  login_button_click();
};

document.getElementById("login_modal_box_close").onclick = () => {
  document.getElementById("username").value = null;
  document.getElementById("password").value = null;
  document.getElementById("login_modal").style.display = "none";
};

document.getElementById("join_modal_box_close").onclick = () => {
  document.getElementById("join_username").value = null;
  document.getElementById("join_password").value = null;
  document.getElementById("join_password2").value = null;
  document.getElementById("email").value = null;
  document.getElementById("nickname").value = null;
  document.getElementById("join_modal").style.display = "none";
};

document.getElementById("join_button").onclick = () => {
  document.getElementById("join_modal").style.display = "flex";
};

BACK_URL = "http://127.0.0.1:8000/";

function login_check() {
  const response = fetch(BACK_URL + "user/auth/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
  });

  response.then(function (response) {
    if (response.status === 200) {
      window.location.replace("/main.html");
    } else if (response.status === 401) {
      console.log("인증실패");
    }
  });
}

login_check();
