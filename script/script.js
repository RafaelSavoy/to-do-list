function setClasses() { // This function is used to update all classes in List Items 
  let items = document.querySelectorAll(".listItems__item");
  items.forEach((e, i) => {
    let currentItemId = e.classList[1]
    let newItemId = i
    if (currentItemId == undefined) {
      e.classList.add(i);
    } else {
      e.classList.replace(currentItemId, newItemId);
    }
  });
}

function addToLocalStorage(title) { // This function is used to add item to localstorage
  let array = [];
  if (
    localStorage.getItem("list") != null ||
    localStorage.getItem("list") != undefined
  ) {
    array = JSON.parse(localStorage.getItem("list"));
  }

  array.push(title);

  localStorage.setItem("list", JSON.stringify(array));
}
function removeFromLocalStorage(id) {// This function is used to remove item from localstorage
  let array = [];
  if (
    localStorage.getItem("list") != null ||
    localStorage.getItem("list") != undefined
  ) {
    array = JSON.parse(localStorage.getItem("list"));
  }

  const newArray = array.filter((value, index) => {
    return index != id;
  });
  localStorage.setItem("list", JSON.stringify(newArray));
}
function addToPage(title) { // This function is used to add list items to page 
  const ul = document.getElementById("listItems__list");
  const li = document.createElement("li");
  const p = document.createElement("p");
  const a = document.createElement("a");
  const i = document.createElement("i");
  
  i.classList.add("glyphicon","glyphicon-remove","color-red");
  a.appendChild(i);
  
  a.addEventListener("click", function () {
    let currentItem = li.classList[1];
    this.parentNode.remove();

    setClasses();
    removeFromLocalStorage(currentItem);
    console.log(`O item ${currentItem} foi removido`);
  });

  li.classList.add("listItems__item");
  
  p.classList.add("listItems__item__title");
  p.innerHTML = title;
  
  li.appendChild(p);
  li.appendChild(a);
  ul.appendChild(li);
  setClasses();
}
function createItem(title) { // This function is used to add item in localstorage and page
  const input = document.getElementById("input--title");
  addToPage(title);
  addToLocalStorage(title);
  input.value = "";
}

function generatePage() {//This function is used to generate List of Items getting items from localstorage and adding in page
  let array = [];
  if (
    localStorage.getItem("list") != null ||
    localStorage.getItem("list") != undefined
  ) {
    array = JSON.parse(localStorage.getItem("list"));
  }
  array.forEach((e) => {
    addToPage(e);
  });
}

window.onload = () => {
  generatePage();
};

document.getElementById("additem__form").onsubmit = (e) => {
  const input = document.getElementById("input--title");
  e.preventDefault();
  createItem(input.value);
};
