FRONT_URL = "http://127.0.0.1:5500/"
BACK_URL = "http://127.0.0.1:8000/"


async function login_api() {

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }

    // console.log(data)

    const response = await fetch(BACK_URL + "user/api/yujeon/token/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response_json = await response.json();

    const accessToken = response_json.access;

    if (response.status === 200) {
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);


        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // document.querySelector("#payload").value = jsonPayload;

        localStorage.setItem("payload", jsonPayload);

        const pay = localStorage.getItem("payload")

        const user_id = pay.split(",")[4].split(":")[1]

        document.getElementById("login_modal").style.display = "none";

        window.location.reload();

    }

    else if (response.status === 400) {
        alert("로그인에 실패 했습니다.");
    }

}

function logout() {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");

    window.location.href = "./user.html";

}

async function test_api() {

    const response = await fetch(BACK_URL + "user/", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access")
        }
    });


    const response_json = await response.json();

    console.log(response_json)

    if (response.status === 200) {
        alert("성공")
    }

    else if (response.status === 401) {
        alert("실패")
    }

}

async function signup() {

    const data = {
        username: document.getElementById("join_username").value,
        password: document.getElementById("join_password").value,
        email: document.getElementById("email").value,
        nickname: document.getElementById("nickname").value
    }

    console.log(data)

    const response = await fetch(BACK_URL + "user/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response_json = await response.json();

    if (response.status === 200) {
        alert("회원가입 성공")
        window.location.reload();
    }

    else if (response.status === 400) {
        alert("회원가입 실패")
        window.location.reload();
    }

}

// test_api()

