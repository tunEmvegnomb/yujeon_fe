BACK_URL = "http://127.0.0.1:8000/";

async function login_check() {

    const response = fetch(BACK_URL + "user/auth/", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("yujeon_access_token")
        }
    });

    response.then(function (response) {
        if (response.status === 200) {
            window.location.href = "./main.html";
            console.log('인증성공')
        } else if (response.status === 401) {
            console.log('인증실패')
        }
    
});
}

login_check()