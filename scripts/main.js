function payload_dat_get() {
  const payload = JSON.parse(localStorage.getItem("payload"));
  const nickname = payload.nickname;
  html = `${nickname}님 환영합니다.`;
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
  let title = document.getElementById("info_title").value
  let desc = document.getElementById("info_desc").value
  let cost = document.getElementById("info_cost").value
  let image = document.getElementById("upload_file").files[0]

  console.log(image)

  const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("desc", desc);
    formdata.append("cost", cost);
    formdata.append("image", image);

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

user_hover()
payload_dat_get();