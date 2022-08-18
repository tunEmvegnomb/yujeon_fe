// BACK_URL = "http://3.35.165.192/";
BACK_URL = "http://127.0.0.1:8000/"

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
  document.getElementById("info_cost").value = 3;
  document.body.style.overflow = "auto";
  document.body.style.touchAction = "auto";
}

function img_upload_button() {
  document.getElementById("upload_modal_box").style.display = "flex";
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
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
  let is_exposure = ""

  if (document.getElementById("is_exposure").checked) {
    is_exposure = document.getElementById("is_exposure").value
  }
  else if (document.getElementById("is_not_mine").checked) {
    is_exposure = document.getElementById("is_not_mine").value
  }
  else {
    document.getElementById("is_exposure").value = "True"
    is_exposure = document.getElementById("is_exposure").value
  }

  let title = document.getElementById("info_title").value
  let desc = document.getElementById("info_desc").value
  let cost = document.getElementById("info_cost").value
  let image = document.getElementById("upload_file").files[0]
  
  let is_mine = "True"
  
  const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("desc", desc);
    formdata.append("cost", cost);
    formdata.append("image", image);
    formdata.append("is_exposure", is_exposure);
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
  document.body.style.overflow = "auto";
  document.body.style.touchAction = "auto";
}

function image_upload_enter() {
  var keyCode = event.keyCode;
  if (keyCode == 13) {
    image_upload();
  }
}
function user_info() {
  let user_info = user_info_get();
}
function user_collection(){
  window.location.href = "./mypage.html";
}

function user_profile() {
  let user_profile = get_user_profile();
}

// user_info()
user_hover()
payload_dat_get();