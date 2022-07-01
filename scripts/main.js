// 페이지를 다시 로딩 하면 벌어지는 일들!
window.onload = ()=>{
    const payload = JSON.parse(localStorage.getItem("payload"));

    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)){


    } else {
        // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
        const requestRefreshToken = async (url) => {
              const response = await fetch("http://127.0.0.1:8000/user/api/token/refresh/", {
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  method: "POST",
                  body: JSON.stringify({
                      "refresh": localStorage.getItem("yujeon_refresh_token")
                  })}
              );
              return response.json();
        };

        // 다시 인증 받은 accessToken을 localStorage에 저장하자.
        requestRefreshToken("/user/api/token/refresh/").then((data)=>{
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;

            localStorage.setItem("yujeon_access_token", accessToken);
        });
    }
};

function payload_dat_get() {
  const payload = JSON.parse(localStorage.getItem("payload"));
  const nickname = payload.nickname;
  html = `<b>${nickname}님 환영합니다.`;
  document.getElementById("welcome_user").innerHTML = html;
}

function setImageFromFile(input, expression) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(expression).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}


function img_upload() {
  const upload_file = document.getElementById("upload_file");
  upload_file.click();

  upload_file.onchange = function () {
    input = upload_file.files[0];
    document.getElementById("upload_img").src = URL.createObjectURL(input);
    document.getElementById("upload_img").style.display = "block";
    document.getElementById("upload_btn").style.display = "none";

  }
}
function img_upload_cancel() {
  document.getElementById("upload_modal_box").style.display = "none";
  document.getElementById("upload_img").style.display = "none";
  document.getElementById("upload_btn").style.display = "flex";
  document.getElementById("info_input_box").style.display = "none";
  document.getElementById("upload_file").value = null;
  document.getElementById("info_title").value = null;
  document.getElementById("info_desc").value = null;
  document.getElementById("info_cost").value = null;
}

function img_upload_button() {
  document.getElementById("upload_modal_box").style.display = "flex";
}

function img_upload_submit() {
  upload_file = document.getElementById("upload_file");
  
  if (document.getElementById("upload_file").value == "") {
    document.getElementById("not_img_upload").style.display = "flex";
    setTimeout(() => document.getElementById("not_img_upload").style.display = "none", 3000);

    return;
  }
  else {
    document.getElementById("info_input_box").style.display = "flex";
  }
}

function info_submit() {
  if (document.getElementById("is_mine").checked) {
    document.getElementById("is_mine").value = "True"
  }
  else {
    document.getElementById("is_mine").value = "False"
  }
    

  let title = document.getElementById("info_title").value
  let desc = document.getElementById("info_desc").value
  let cost = document.getElementById("info_cost").value
  let image = document.getElementById("upload_file").files[0]
  let is_mine = document.getElementById("is_mine").value
  
  const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("desc", desc);
    formdata.append("cost", cost);
    formdata.append("image", image);
    formdata.append("is_mine", is_mine);

  return formdata

}
function user_hover() {
  document.getElementById("user_info").onmouseleave = function () {
    let user_menu = document.getElementById("user_menu")
    user_menu.onmouseleave = () => {
      user_menu.style.display = "none"
    }
  }

  document.getElementById("user_info").onmouseover = () => {
    document.getElementById("user_menu").style.display = "flex";
  }

}

function detail_modal_close() {
  document.getElementById("detail_modal").style.display = "none";
}

function image_upload_enter() {
  // console.log("hi")
  var keyCode = event.keyCode;
  if (keyCode == 13) {
    image_upload();
  }
}

user_hover()
payload_dat_get();