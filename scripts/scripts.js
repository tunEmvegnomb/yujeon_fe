function login_button_click() {
    document.getElementById('login_modal').style.display = "flex";
}

document.getElementById("login_button").onclick = () => {
    login_button_click();
}

document.getElementById("login_modal_box_close").onclick = () => {
    document.getElementById('login_modal').style.display = "none";
}

document.getElementById("join_modal_box_close").onclick = () => {
    document.getElementById('join_modal').style.display = "none";
}

document.getElementById("join_button").onclick = () => {
    document.getElementById('join_modal').style.display = "flex";
}