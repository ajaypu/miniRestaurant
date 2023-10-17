const form = document.querySelector(".form");
const price = document.querySelector("#price");
const dish = document.querySelector("#dish");
const table = document.querySelector("#table");
const table1List = document.querySelector("#table-1-list");
const table2List = document.querySelector("#table-2-list");
const table3List = document.querySelector("#table-3-list");
let axiosAPI =
  "https://crudcrud.com/api/3fbd1d9536c2440ab59e829da2ed686e/miniRestaurantApp";

// creating Delete button
function deleteBtn(obj) {
  let delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.appendChild(document.createTextNode("delete Order"));
  // delete button eventListener
  delBtn.addEventListener("click", (e) => delOrder(obj, e));
  async function delOrder(obj, e) {
    let tableItems = await axios.get(axiosAPI);
    let orderItems = tableItems.data.find((io) => {
      return io.price === obj.price && io.dish === obj.dish;
    });
    await axios.delete(`${axiosAPI}/${orderItems._id}`);
    const li = e.target.parentElement;
    if (obj.table === "table1") {
      table1List.removeChild(li);
    } else if (obj.table === "table2") {
      table2List.removeChild(li);
    } else if (obj.table === "table3") {
      table3List.removeChild(li);
    }
  }
  //
  return delBtn;
}

// creating li
function li(obj) {
  const li = document.createElement("li");
  li.className = "li-item";
  li.appendChild(deleteBtn(obj));
  li.appendChild(document.createTextNode(`${obj.price} ${obj.dish}`));
  if (obj.table === "table1") {
    table1List.appendChild(li);
  } else if (obj.table === "table2") {
    table2List.appendChild(li);
  } else if (obj.table === "table3") {
    table3List.appendChild(li);
  }
}
form.addEventListener("submit", onSubmit);
function onSubmit(e) {
  e.preventDefault();

  let obj = {
    price: price.value,
    dish: dish.value,
    table: table.value,
  };
  li(obj);
  axios.post(axiosAPI, obj);
}
window.addEventListener("DOMContentLoaded", tableItemsOnScreen);

async function tableItemsOnScreen(e) {
  //
  const tableItems = await axios.get(axiosAPI);
  for (let i = 0; i < tableItems.data.length; i++) {
    li(tableItems.data[i]);
  }
}
