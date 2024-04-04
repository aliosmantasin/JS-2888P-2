let valueUserInfo = JSON.parse(localStorage.getItem("addUserInfo"));

function getUserInfo() {
  const userCard = document.getElementById("contents");
  userCard.innerHTML = valueUserInfo.map(
      (user) =>
        `
    <div class="card" style="width: 18rem;">
      <div class="cardHead">
        <p><b>User Id:</b> ${user.userId} </p>
        <p><b>Id:</b> ${user.id} </p>
      </div>

      <div class="cardBody">
        <p><b>Title:</b> ${user.title} </p>
        <p><b>Body:</b> ${user.body} </p>
      </div>
    </div>
    `
    ).join("");
}

// getUserInfo fonksiyonunu çağırarak kartları oluştur
getUserInfo();

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let userId = params.userId; // let olmalı

async function findUser() {
  userId = +prompt("1 ile 10 arasında lütfen bir sayı giriniz");
  if (userId >= 1 && userId <= 10) {
    try {
      apiUrl = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      userInfo = await apiUrl.json();
      // console.log(userInfo);
      displayUserPosts(userInfo);
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Lütfen 1 ile 9 arasında bir sayı giriniz");
  }
}

function displayUserPosts(userInfo) {
  const userCard = document.getElementById("contents");
  userCard.innerHTML = userInfo
    .map(
      (user) =>
        `
    <div class="card" style="width: 18rem;">
        <div class="cardHead">
        <p><b>User Id:</b> ${userId} </p>
        <p><b>Id:</b> ${user.id} </p>
        </div>

        <div class="cardBody">
        <p><b>Title:</b> ${user.title} </p>
        <p><b>Body:</b> ${user.body} </p>
        </div>
    </div>
    `
    )
    .join("");
}
