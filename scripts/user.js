function login_check() {

    let token = localStorage.getItem("access")
    console.log(token)


    if (localStorage.getItem("access")) {
        window.location.href = "./main.html"
    }

}

login_check()