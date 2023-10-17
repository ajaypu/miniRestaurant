const form = document.querySelector(".form");
const price = document.querySelector("#price");
const dish = document.querySelector("#dish");
const table = document.querySelector("#table");

const table1List = document.querySelector("#table-1-list");
const table2List = document.querySelector("#table-2-list");
const table3List = document.querySelector("#table-3-list");

const axiosAPI =
  "https://crudcrud.com/api/c7bd9b52c53943fea0f8764b5c63a884/miniRestaurantApp";

//form eventListener
form.addEventListener("submit", onSubmit);

// delete button
function deleteButton(obj) {
  const delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.appendChild(document.createTextNode("Delete Order"));
  // delete button eventListener
  delBtn.addEventListener("click", delItem(obj, e));
  async function delItem(obj, e) {
    let tableDetails = await axios.get(axiosAPI);
    let tableDe = tableDetails.data.find((t) => {
      return t.price === obj.price && t.dish === obj.dish;
    });
  }
  return delBtn;
}
// creating li element
function li1(obj) {
  const li = document.createElement("li");
  li.className = "table-li";
  li.appendChild(document.createTextNode(`${obj.price} ${obj.dish}`));
  li.appendChild(deleteButton());
  table1List.appendChild(li);
}
//
function li2(obj) {
  const li = document.createElement("li");
  li.className = "table-li";
  li.appendChild(document.createTextNode(`${obj.price} ${obj.dish}`));
  li.appendChild(deleteButton());
  table2List.appendChild(li);
}
//
function li3(obj) {
  const li = document.createElement("li");
  li.className = "table-li";
  li.appendChild(document.createTextNode(`${obj.price} ${obj.dish}`));
  li.appendChild(deleteButton());
  table3List.appendChild(li);
}
async function onSubmit(e) {
  e.preventDefault();
  let obj = {
    price: price.value,
    dish: dish.value,
    table: table.value,
  };

  if (table.value === "table 1") {
    li1();
  } else if (table.value === "table 2") {
    li2();
  } else if (table.value === "table 3") {
    li3();
  }
  await axios.post(axiosAPI, obj);
}

window.addEventListener("DOMContentLoaded", AddNewUshersOnScreen);

function AddNewUshersOnScreen() {
  axios.get(axiosAPI).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      li1(res.data[i]);
    }
  });
  axios.get(axiosAPI).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      li2(res.data[i]);
    }
  });
  axios.get(axiosAPI).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      li3(res.data[i]);
    }
  });
}
