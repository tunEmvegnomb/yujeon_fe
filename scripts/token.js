FRONT_URL = "http://127.0.0.1:5500/";
BACK_URL = "http://127.0.0.1:8000/";

window.onload = () => {
  const payload = JSON.parse(localStorage.getItem("payload"));

  if (payload.exp > Date.now() / 1000) {
    
  } else {
    const requestRefreshToken = async (url) => {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          "refresh": localStorage.getItem("yujeon_refresh_token"),
        })}
      );
      return response.json();
    };

    requestRefreshToken(BACK_URL + "user/api/token/refresh/").then((data) => {
      localStorage.setItem("yujeon_access_token", data.access);

    });
  }
};