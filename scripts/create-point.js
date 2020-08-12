function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
  )
    .then((answer) => {
      return answer.json();
    }) //pode ser ( answer => answer.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}
populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((answer) => {
      return answer.json();
    }) //pode ser ( answer => answer.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//items de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

let selectedItem = [];
const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event) {
  //add or remove a class with JS
  const itemLi = event.target;
  const itemID = itemLi.dataset.id;
  itemLi.classList.toggle("selected");

  const alreadySelected = selectedItem.findIndex(item=>{
    const itemExists = item == itemID //true or false
    return itemExists
  })
  
  if(alreadySelected >= 0){//if already selected, pops out from the array
    const filteredItems = selectedItem.filter((item)=>{
      const differentItem = item != itemID
      return differentItem
    })
    selectedItem = filteredItems

  }else{//if not selected pushes in to the array
    selectedItem.push(itemID)
  }
  collectedItems.value = selectedItem
}
