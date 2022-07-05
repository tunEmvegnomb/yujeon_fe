BACK_URL = "http://127.0.0.1:8000/";

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
            console.log(element.post.artimage)
            let image = element.post.artimage

            let html = `<li>
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


    }

}

mypage_get();