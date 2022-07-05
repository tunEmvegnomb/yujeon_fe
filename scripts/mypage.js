BACK_URL = "http://localhost:8000/";

async function mypage_get() {
    const response = await fetch(BACK_URL + "post/collection/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("yujeon_access_token"),
        },

    });

    const data = await response.json();

    if (response.status === 200) {
        // console.log(data)
        data.forEach(item => {
            // let like = item.post.like

            let image = item.post.artimage
            console.log(image)

            let html = `<ul><li>
        <img src="${image}" />
        <div class="my_picture_cost">
            50P
        </div>
        <div class="my_picture_like">
            좋아요 5개
        </div>
        <div class="my_picture_public">
            지금 공개
        </div>
    </li></ul>`

            document.getElementById("picture_list_get").innerHTML += html


        });
    }
    else if (response === 401) {
        console.log("너 인증안됨 ㅅㄱ")
    }
    else if (response === 500) {
        console.log("서버 터짐!")
    }

}

mypage_get();