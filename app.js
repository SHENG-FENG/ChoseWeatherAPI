const URL = `https://api.openweathermap.org/data/2.5/box/city?bbox=120,19,122,30,10&appid=cb9de36bbd3a6969b700004716fd3036`;

let area = document.querySelector(".area");
let tem = document.querySelector(".tem");
let fellLike = document.querySelector(".feel-like");
let humidity = document.querySelector(".humidity");
let maxTem = document.querySelector(".max-tem");
let minTem = document.querySelector(".min-tem");

area.addEventListener("change", getweather);

async function getweather(e) {
  let select;
  if (!e) {
    select = "Taipei";
  } else {
    select = e.target.value;
  }
  //串接API
  await fetch(URL)
    //json轉換
    .then((res) => {
      return res.json();
    })
    //拉資料
    .then((data) => {
      let len = data.list.length;
      //把所有名稱先放上去
      for (let i = 0; i < len; i++) {
        let city = data.list[i].name;
        let option = document.createElement("option");
        option.textContent = city;
        area.appendChild(option);
      }
      //選到甚麼城市顯示該數值
      for (let i = 0; i < len; i++) {
        let timeList = data.list[i].main.temp;
        let maxList = data.list[i].main.temp_max;
        let minList = data.list[i].main.temp_min;
        let fellLikeList = data.list[i].main.feels_like;
        let humidityList = data.list[i].main.humidity;
        if (select == data.list[i].name) {
          tem.textContent = timeList + "度";
          maxTem.textContent = maxList + "度";
          minTem.textContent = minList + "度";
          fellLike.innerHTML = fellLikeList + "度";
          humidity.innerHTML = humidityList;
        }
      }
    });
}
getweather();
