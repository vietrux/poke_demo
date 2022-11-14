//khởi tạo biến
var list_poke_detail = []
var current_id = 0
var current_page = 0

//lấy dữ liệu và hiển thị
async function main() {
  const app = document.getElementById('app')
  app.innerHTML = ""
  list_poke_detail = []
  //get all pokemon
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
  const list_poke = res.data.results

  for (var i = 0; i < 20; i++) {
    //get one_pokemon
    const res = await axios.get(list_poke[i].url)
    const one_poke = res.data
    list_poke_detail.push(one_poke)
    var template_card = `
    <div class="card" loading="lazy">
      <div class="card-body">
        <h5 class="card-title">${list_poke[i].name}</h5>
        <img src="${list_poke_detail[i].sprites.other.dream_world.front_default}" class="card-img-top" alt="...">
        <div id="btn-${i}"></div>
      </div>
    </div>
    `
    app.innerHTML += template_card
    //create button
    var btn = document.createElement("a")
    btn.setAttribute("class", "btn btn-primary")
    //add onlick
    btn.setAttribute("onclick", `show_popup(${JSON.stringify(one_poke)},'${list_poke[i].name}')`)
    btn.innerHTML = "More detail"
    document.getElementById(`btn-${i}`).appendChild(btn)
  }
}
//chạy hàm main
main()

//các chức năng của popup
function show_popup(one_poke, name) {
  var template_popup = `
  <div class="popup-content" >
    <img class="card-left" src="${one_poke.sprites.other.dream_world.front_default}">
    <div class="card-right">
      <h1>${name}</h1>
      <p>${one_poke.id}</p>
      <a class="btn btn-danger" onclick="close_popup()">Close</a>
      <a class="btn btn-secondary" onclick="back_poke()">Back</a>
      <a class="btn btn-primary" onclick="next_poke()">Next</a>
    </div>
  </div>
  `
  const popup = document.getElementById('popup')
  popup.innerHTML = template_popup
  popup.style.display = "flex"
  current_id = one_poke.id - 1 - current_page
}
function close_popup() {
  const popup = document.getElementById('popup')
  popup.style.display = "none"
}
function next_poke() {
  if (current_id < 19) {
    current_id += 1
    show_popup(list_poke_detail[current_id], list_poke_detail[current_id].name)
  }
}
function back_poke() {
  if (current_id > 0) {
    current_id -= 1
    show_popup(list_poke_detail[current_id], list_poke_detail[current_id].name)
  }
}

