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

  upload_file.onchange = function() {
    input = upload_file.files[0];
    document.getElementById("upload_img").src = URL.createObjectURL(input);
    document.getElementById("upload_img").style.display = "block";
    document.getElementById("upload_btn").style.display = "none";
    
  }
}
function img_upload_cancel(){
  document.getElementById("upload_modal_box").style.display = "none";
  document.getElementById("upload_img").style.display = "none";
  document.getElementById("upload_btn").style.display = "flex";
}

function img_upload_button() {
  document.getElementById("upload_modal_box").style.display = "flex";
}

payload_data_get();