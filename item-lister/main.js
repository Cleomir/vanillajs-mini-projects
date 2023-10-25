// DOM references
const form = document.getElementById("addForm");
const itemList = document.getElementById("items");
const filter = document.getElementById("filter");

// event listeners
form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);

function addItem(event) {
  event.preventDefault();

  // li tag
  const newItemText = document.getElementById("item").value;
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.appendChild(document.createTextNode(newItemText));

  // X button
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm float-right delete";
  deleteButton.appendChild(document.createTextNode("X"));

  li.appendChild(deleteButton);
  itemList.appendChild(li);
}

function removeItem(event) {
  if (event.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      const li = event.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

function filterItems(event) {
  const text = event.target.value.toLowerCase();
  const items = itemList.getElementsByTagName("li");
  Array.from(items).forEach((item) => {
    const itemName = item.firstChild.textContent.trim();
    if (itemName.toLowerCase().indexOf(text) !== -1) {
      item.setAttribute("style", "display: flex !important");
    } else {
      item.setAttribute("style", "display: none !important");
    }
  });
}
