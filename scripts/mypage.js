BACK_URL = "http://127.0.0.1:8000/";


document.getElementById("grade").onmouseover = function () {
    document.getElementById("grade_info").style.display = "block";
}
document.getElementById("grade").onmouseout = function () {
    document.getElementById("grade_info").style.display = "none";
}

async function mypage_get() {

    const response = await fetch(BACK_URL + "post/collection/", {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("yujeon_access_token"),
        },
        method: "GET",
    });
    const response_json = await response.json();
    if (response.status === 200) {

        response_json.forEach(element => {
            let image = element.post.artimage
            let cost = element.post.cost
            let like = element.post.like.length

            let html = `<li onclick="collection_click(${cost},${like})">
            <img src="${image}" />
            <!-- <div class="my_picture_cost">
                ${cost}P
            </div>
            <div class="my_picture_like">
                좋아요 ${like}개
            </div>
            <div class="my_picture_public">
                지금 공개
            </div> -->
        </li>`
            
            document.getElementById("picture_list_get").innerHTML += html
        });

        var options = {
            start: 0,
            fadeIn: 400,
            loop: true,
            buttonPrev: 'Previous',
            buttonNext: 'Next',
            style: 'carousel',
            spacing: -0.3,
            nav: false,
            buttons: false
        };

        $('.my_picture_list').flipster(options);

        document.getElementById("collection_count").innerText = response_json.length

        const payload = JSON.parse(localStorage.getItem("payload"));

        const nickname = payload.nickname
        
        document.getElementById("user_nickname").innerText = nickname

        document.getElementById("collection_like").innerText = response_json[0].post.like.length
        document.getElementById("collection_cost").innerText = response_json[0].post.cost
    }

}
function go_mypage() {
    window.location.replace("main.html")
}
function collection_click(cost,like) {
    console.log(cost,like)
    document.getElementById("collection_like").innerText = like
    document.getElementById("collection_cost").innerText = cost
}

mypage_get();