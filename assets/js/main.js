// Elements
const form = document.querySelector(".shopping-form");
const nameInput = document.querySelector("#name");
const quantityInput = document.querySelector("#quantity");
const priceInput = document.querySelector("#price");
const tableBody = document.querySelector(".shopping-table tbody");
const shoppingTable = document.querySelector(".shopping-table ");
const totalDiv = document.querySelector(".total-div");
const totalDivSpan = document.querySelector(".shopping-total span");
const btn = document.querySelector("#btn");
const notFoundMessage = document.querySelector("#notFound");

let items = [];
let currentItemIndex = null;

const formatPrice = (price) => {
  return price.toLocaleString();
};

const updateTable = () => {
  tableBody.innerHTML = "";
  if (items.length === 0) {
    notFoundMessage.style.display = "flex";
    totalDiv.style.display = "none";
    shoppingTable.style.display = "none";
  } else {
    notFoundMessage.style.display = "none";
    totalDiv.style.display = "flex";
    shoppingTable.style.display = "table";

    items.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${formatPrice(item.price)} so'm</td>
          <td>${formatPrice(item.total)} so'm</td>
          <td class="shopping-btns">
          <button class="btn-edit" onclick="editItem(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteItem(${index})">Delete</button>
          </td>
          `;
      tableBody.appendChild(row);
    });
  }
  updateTotal();
};

const updateTotal = () => {
  const total = items.reduce((acc, item) => acc + item.total, 0);
  totalDivSpan.textContent = `${formatPrice(total)} so'm`;
};

const addItem = (item) => {
  items.push(item);
  saveItemsToLocalStorage();
  updateTable();
};

const editItem = (index) => {
  const item = items[index];
  nameInput.value = item.name;
  quantityInput.value = item.quantity;
  priceInput.value = item.price;
  currentItemIndex = index;
  btn.textContent = "Edit";
};

const deleteItem = (index) => {
  items.splice(index, 1);
  saveItemsToLocalStorage();
  updateTable();
};

const saveItemsToLocalStorage = () => {
  localStorage.setItem("items", JSON.stringify(items));
};

const loadItemsFromLocalStorage = () => {
  const storedItems = localStorage.getItem("items");

  if (storedItems) {
    items = JSON.parse(storedItems);
    updateTable();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btn.textContent = "Create";
  const name = nameInput.value.trim();
  const quantity = quantityInput.value;
  const price = priceInput.value;

  if (name && quantity !== "" && price !== "") {
    const total = quantity * price;
    if (currentItemIndex !== null) {
      items[currentItemIndex] = { name, quantity, price, total };
      currentItemIndex = null;
    } else {
      addItem({ name, quantity, price, total });
    }
    form.reset();
    updateTable();
  } else {
    if (!name) {
      nameInput.style.borderColor = "red";
    }

    if (quantity == "") {
      quantityInput.style.borderColor = "red";
    }
    if (price == "") {
      priceInput.style.borderColor = "red";
    }
    setTimeout(() => {
      nameInput.style.borderColor = "#5D5FEF";
      quantityInput.style.borderColor = "#5D5FEF";
      priceInput.style.borderColor = "#5D5FEF";
    }, 3000);
  }
});

nameInput.addEventListener("keydown", () => {
  nameInput.style.borderColor = "#5D5FEF";
});
quantityInput.addEventListener("keydown", () => {
  quantityInput.style.borderColor = "#5D5FEF";
});
priceInput.addEventListener("keydown", () => {
  priceInput.style.borderColor = "#5D5FEF";
});

document.addEventListener("DOMContentLoaded", loadItemsFromLocalStorage);
