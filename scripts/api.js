FRONT_URL = "http://127.0.0.1:5500/";
BACK_URL = "http://127.0.0.1:8000/";

async function login_api() {
  const data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  // console.log(data)

  const response = await fetch(BACK_URL + "user/api/yujeon/token/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response_json = await response.json();

  const accessToken = response_json.access;
  const refreshToken = response_json.refresh;

  // document.querySelector("#access-token").value = accessToken;
  // document.querySelector("#refresh-token").value = refreshToken;

  if (response.status === 200) {
    localStorage.setItem("yujeon_access_token", response_json.access);
    localStorage.setItem("yujeon_refresh_token", response_json.refresh);

    const base64Url = accessToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    // document.querySelector("#payload").value = jsonPayload;

    localStorage.setItem("payload", jsonPayload);

    window.location.reload();
  } else if (response.status === 400) {
    alert("로그인에 실패 했습니다.");
  }
}

function logout() {
  localStorage.removeItem("yujeon_access_token");
  localStorage.removeItem("yujeon_refresh_token");
  localStorage.removeItem("payload");

  window.location.href = "./user.html";
}

async function signup() {
  const data = {
    username: document.getElementById("join_username").value,
    password: document.getElementById("join_password").value,
    email: document.getElementById("email").value,
    nickname: document.getElementById("nickname").value,
  };

  console.log(data);

  const response = await fetch(BACK_URL + "user/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response_json = await response.json();

  if (response.status === 200) {
    alert("회원가입 성공");
    window.location.reload();
  } else if (response.status === 400) {
    alert("회원가입 실패");
    window.location.reload();
  }
}

// window.onload = ()=>{
//     const payload = JSON.parse(localStorage.getItem("payload"));

//     console.log(payload.nickname)
// }

async function image_upload() {
  const formdata = info_submit();

  // const data = {
  //     title : "타이틀 입니다!",
  //     desc : "설명 입니다!",
  //     image : formdata.image,
  //     cost : 10000
  // }

  const response = await fetch(BACK_URL + "post/upload/", {
    method: "POST",
    headers: {
      // Accept: "multipart/form-data",
      // "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
    //from data
    //formdata
    body: formdata,
  });

  const response_json = await response.json();

  if (response.status === 200) {
    alert("업로드 성공");
    window.location.reload();
  } else if (response.status === 400) {
    alert("업로드 실패");
    window.location.reload();
  }
}

async function get_img_list() {
  const response = await fetch(BACK_URL + "post/upload/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
  });

  const response_json = await response.json();

  if (response.status === 200) {
    response_json.forEach((item) => {
      let image = item.image;
      let title = item.title;
      let desc = item.desc;
      let cost = item.cost;
      let artist = item.artist_name;
      let id = item.id;

      html = `
        <figure>
        <div onclick="detail_modal(${id})">
            <img src="http://127.0.0.1:8000${image}" alt="${desc}" srcset="">
        </div>
        <figcaption">${artist}</figcaption>
    </figure>`;

      document.getElementById("paint_list").innerHTML += html;
    });
  } else if ((response.status === 401) | (response.status === 400)) {
    console.log("실패");
    // window.location.reload();
  }
}

async function detail_modal(id) {
  const payload = JSON.parse(localStorage.getItem("payload"));
  const user_id = payload.user_id;

  const data = {
    id: id,
  };

  const response = await fetch(BACK_URL + "post/detail/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
    body: JSON.stringify(data),
  });

  const response_json = await response.json();

  if (response.status === 200) {
    let image = response_json.image;
    let title = response_json.title;
    let desc = response_json.desc;
    let cost = response_json.cost;
    let artist = response_json.artist_name;
    let like = response_json.like;
    let id = response_json.id;

    console.log(like);

    html = `<div class="detail_modal_box">
    <div class="detail_modal_close" onclick="detail_modal_close()"><i class="fa-solid fa-circle-xmark"></i>
    </div>
  
    <div class="detail_img">
        <img src="http://127.0.0.1:8000${image}" alt="${desc}" srcset="">
    </div>
    <div class="detail_info">
        <h2>${title}</h2>
        <div class="detail_artist">Artist<span>${artist}</span></div>
        <div class="detail_desc">${desc}</div>
        <div class="detail_bottom">
            <div class="detail_buy">
                ${cost}포인트 바로 구매!
            </div>
            <div onclick="post_like(${id})" id="detail_like" class="detail_like">
            <i class="fa-regular fa-heart"></i>
                <!-- <i class="fa-solid fa-heart"></i> -->
                ${like.length}
            </div>
        </div>
    </div>
  </div>`;

    let likeon = `<i class="fa-solid fa-heart"></i> ${like.length}`;

    let likeoff = `<i class="fa-regular fa-heart"></i> ${like.length}`;

    document.getElementById("detail_modal").innerHTML = html;

    if (like.includes(user_id)) {
      document.getElementById("detail_like").innerHTML = likeon;
    } else {
      document.getElementById("detail_like").innerHTML = likeoff;
    }
  }
  if (response.status === 400) {
    console.log("실패");
  }

  document.getElementById("detail_modal").style.display = "flex";
}
function post_like(id) {
  const response = fetch(BACK_URL + "post/like/" + id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
    // body: JSON.stringify(data),
  });

  response.then((res) => {
    if (res.status === 200) {
      detail_modal(id);
      // window.location.reload();
    } else if (res.status === 400) {
      alert("좋아요 실패");
      // window.location.reload();
    }

    if (response.status === 200) {
      alert("좋아요 성공");
    } else if (response.status === 400) {
      alert("좋아요 실패");
    }
  });
}

get_img_list();
