BACK_URL = "http://3.35.165.192/";

async function login_api() {
  const data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

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

    localStorage.setItem("payload", jsonPayload);

    window.location.reload();
  } else if ((response.status === 400) | (response.status === 401)) {
    alert("아이디 혹은 비밀번호를 확인해 주세요.");
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
  }
}

async function image_upload() {
  const formdata = info_submit();

  document.getElementById("loadingimage").style.display = "flex";

  const response = await fetch(BACK_URL + "post/upload/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
    body: formdata,
  });
  const response_json = await response.json();

  if (response.status === 200) {
    document.getElementById("loadingimage").style.display = "none";
    alert("업로드 성공");
    window.location.reload();
  } else if (response.status === 400) {
    document.getElementById("loadingimage").style.display = "none";
    alert("업로드 실패");
    // window.location.reload();
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
      let image = item.artimage;
      let title = item.title;
      let desc = item.desc;
      let cost = item.cost;
      let artist = item.artist_name;
      let id = item.id;

      html = `
        <figure>
        <div onclick="detail_modal(${id})">
            <img src="${image}" alt="${desc}" srcset="">
        </div>
        <figcaption">${artist}</figcaption>
    </figure>`;

      document.getElementById("paint_list").innerHTML += html;
    });
    document.getElementById("menu_icon").style.display = "flex";
    document.getElementById("nav").style.display = "flex";
  } else if ((response.status === 401) | (response.status === 400)) {
    document.getElementById("menu_icon").style.display = "none";
    document.getElementById("nav").style.display = "none";
  }
}

async function detail_modal(id) {
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
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
    let image = response_json.artimage;
    let title = response_json.title;
    let desc = response_json.desc;
    let cost = response_json.cost;
    let artist = response_json.artist_name;
    let like = response_json.like;
    let id = response_json.id;
    let collection_id = response_json.collection_id;

    html = `<div class="detail_modal_box">
    <div class="detail_modal_close" onclick="detail_modal_close()"><i class="fa-solid fa-circle-xmark"></i>
    </div>
  
    <div class="detail_img">
        <img src="${image}" alt="${desc}" srcset="">
    </div>
    <div class="detail_info">
        <h2>${title}</h2>
        <div class="detail_artist">Artist<span>${artist}</span></div>
        <div class="detail_desc">${desc}</div>
        <div class="detail_bottom">
            <div onclick="detail_buy(${collection_id})" class="detail_buy">
                ${cost}포인트 바로 구매!
            </div>
            <div onclick="post_like(${collection_id})" id="detail_like" class="detail_like">
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
function post_like(collection_id) {
  const response = fetch(BACK_URL + "post/like/" + collection_id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
  });

  response.then((res) => {
    if (res.status === 200) {
      detail_modal(collection_id);
    } else if (res.status === 400) {
      alert("좋아요 실패");
    }

    if (response.status === 200) {
      alert("좋아요 성공");
    } else if (response.status === 400) {
      alert("좋아요 실패");
    }
  });
}

function user_info_get() {
  const response = fetch(BACK_URL + "user/auth/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
  });

  response.then((res) => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      alert("실패");
    }
  });
}
async function detail_buy(collection_id) {

  const response = await fetch(BACK_URL + "post/purchase/" + collection_id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
    },
  });

    const response_json = await response.json();

    if (response.status === 200) {
      alert(response_json.message);
      console.log(response_json);
      window.location.reload();
    }
    else if (response.status === 400) {
      if (response_json.message)
        alert(response_json.message);

      else if(response_json.error){
        alert(response_json.error);
      }  
    }
     
      
}

user_info_get();
get_img_list();