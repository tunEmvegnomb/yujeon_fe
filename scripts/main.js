function payload_dat_get() {
  const payload = JSON.parse(localStorage.getItem("payload"));
  const nickname = payload.nickname;
  console.log(nickname);
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

  // const formData = new FormData();
  // formData.append("title", title);
  // formData.append("desc", desc);
  // formData.append("cost", cost);
  // formData.append("image", image);
  // console.log(formData)

  // img_upload_cancel();

  // console.log(title, desc, cost, image)

  // const formData = new FormData();
  // formData.append("title", title);
  // formData.append("desc", desc);
  // formData.append("cost", cost);
  // formData.append("image", image);

}

payload_data_get();