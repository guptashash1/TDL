function getAndUpdate() {
  console.log("Updating List...");
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;

  const x = localStorage.getItem("itemsJson");
  if (x == null) {
    iArray = [];
    iArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(iArray));
  } else {
    iArrayStr = x;
    iArray = JSON.parse(iArrayStr);
    iArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(iArray));
  }
  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    iArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(iArray));
  } else {
    iArrayStr = localStorage.getItem("itemsJson");
    iArray = JSON.parse(iArrayStr);
  }

  let tableBody = document.getElementById("tableBody");
  let str = "";
  iArray.forEach((element, index) => {
    str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>`;
  });
  tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex) {
  console.log("Delete", itemIndex);
  iArrayStr = localStorage.getItem("itemsJson");
  iArray = JSON.parse(iArrayStr);

  iArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(iArray));
  update();
}
function clearStorage() {
  if (confirm("Do you areally want to clear?")) {
    console.log("Clearing the storage");
    localStorage.clear();
    update();
  }
}
