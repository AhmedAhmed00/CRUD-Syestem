let productName = document.getElementById("productName");
let productCategory = document.getElementById("productCategory");
let productPrice = document.getElementById("productPrice");
let productQunatity = document.getElementById("productQunatity");
let displayInputsBtn = document.querySelector(".btn-add-product");
let tableBody = document.getElementById("tbody");
let cancelBtn = document.querySelector(".btn-cancel");
let addProductBtn = document.querySelector(".add-procuct");
let lightBoxInputs = document.querySelector(".crud-inputs");
let confirmLayer = document.querySelector(".layer");
let confirmYesBtn = document.querySelector(".confirm-yes");
let confirmCancelBtn = document.querySelector(".confirm-cancel");
let updateBtn = document.querySelector(".update");
let searchInput = document.querySelector(".search-input");
let inputs = Array.from(document.querySelectorAll(".input"));
let arrOfProducts = [];

// check if local the storage inclues data
if (localStorage.getItem("products") != null) {
  arrOfProducts = JSON.parse(localStorage.getItem("products"));
  displayProducts(arrOfProducts);
}
displayInputsBtn.addEventListener("click", displayInputs);
cancelBtn.addEventListener("click", cancelAddProcess);
addProductBtn.addEventListener("click", addProduct);

// event listner to delete product
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    showConfirm();
    confirmYesBtn.onclick = function () {
      {
        hideConfrirm();
        arrOfProducts.splice(e.target.id, 1);
        addToLocalStorage();
        displayProducts(arrOfProducts);
      }
    };
  }
});

// event listner to update product
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("update-product")) {
    updateBtn.classList.remove("d-none");
    addProductBtn.classList.add("d-none");
    displayInputs();
    updateBtn.onclick = function () {
      let newObj = {
        theName: productName.value,
        category: productCategory.value,
        price: productPrice.value,
        quantity: productQunatity.value,
      };
      if (
        validateName() &&
        validateCategory() &&
        validatePrice() &&
        validateQuan()
      ) {
        arrOfProducts[e.target.id] = newObj;
        alertAddedMsg();
        addToLocalStorage();
        displayProducts(arrOfProducts);
      } else {
        alertErorrMsg();
        validateName();
        validateCategory();
        validatePrice();
        validateQuan();
      }
    };
  }
});

// function to Display Inputs when click on add btn
function displayInputs() {
  addProductBtn.classList.remove("d-none");
  lightBoxInputs.classList.toggle("d-none");
}

// Function To Display Crud when click at cancel btn
function cancelAddProcess() {
  lightBoxInputs.style.animationName = "hide";
  setTimeout(() => {
    lightBoxInputs.classList.add("d-none");
    lightBoxInputs.style.animationName = "change-opacity";
  }, 300);

  if (updateBtn.classList.contains("d-none") != true) {
    updateBtn.classList.add("d-none");
  }
  clearInputs();
}

// Function to get Data from Inputs and add it to array
function addProduct() {
  let product = {
    theName: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    quantity: productQunatity.value,
  };
  if (
    validateName() &&
    validateCategory() &&
    validatePrice() &&
    validateQuan()
  ) {
    arrOfProducts.push(product);
    addToLocalStorage();
    displayProducts(arrOfProducts);
    alertAddedMsg();
  } else {
    validateName();
    validateCategory();
    validatePrice();
    validateQuan();
    alertErorrMsg();
  }
}

// every function will validate the input and change his color
function validatePrice() {
  let regexPrice = /^\d{1,8}(?:\.\d{1,4})?$/;
  if (regexPrice.test(productPrice.value) === true) {
    productPrice.classList.remove("is-invalid");
    productPrice.classList.add("is-valid");
    return true;
  } else {
    productPrice.classList.add("is-invalid");
    return false;
  }
}
function validateName() {
  let regexText = /[a-zA-Z]+/;
  if (regexText.test(productName.value) === true) {
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
    return true;
  } else {
    productName.classList.add("is-invalid");
    return false;
  }
}
function validateCategory() {
  let regexText = /[a-zA-Z]+/;
  if (regexText.test(productCategory.value) === true) {
    productCategory.classList.remove("is-invalid");
    productCategory.classList.add("is-valid");
    return true;
  } else {
    productCategory.classList.add("is-invalid");
    return false;
  }
}
function validateQuan() {
  let regexText = /[0-9]+/;
  if (regexText.test(productQunatity.value) === true) {
    productQunatity.classList.remove("is-invalid");
    productQunatity.classList.add("is-valid");
    return true;
  } else {
    productQunatity.classList.add("is-invalid");
    return false;
  }
}

// this functions will change the color of input directly when bluring the input
productName.onblur = function () {
  validateName();
};
productCategory.onblur = function () {
  validateCategory();
};
productQunatity.onblur = function () {
  validateQuan();
};
productPrice.onblur = function () {
  validatePrice();
};
productPrice.onblur = function () {
  validatePrice();
};

// to add data to local storage
function addToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(arrOfProducts));
}

// function to display the data of inputs in table
function displayProducts(arrOfProducts) {
  let tableRows = "";
  for (let i = 0; i < arrOfProducts.length; i++) {
    tableRows += `
   <tr>
            <td >${[i]}</td>
            <td>${arrOfProducts[i].theName}</td>
            <td>${arrOfProducts[i].category}</td>
            <td>${arrOfProducts[i].quantity}</td>
            <td>${arrOfProducts[i].price * arrOfProducts[i].quantity}</td>
            <td><i id="${i}"  i class="fas fa-edit update-product text-warning "></i></td>
            <td ><i id="${i}" class="del delete-product fa-solid fa-trash  text-danger"></i></td>
          </tr>`;
  }
  tableBody.innerHTML = tableRows;
}

// hide confirm
confirmYesBtn.onclick = hideConfrirm;
confirmCancelBtn.onclick = hideConfrirm;

//  to confirm delete
function showConfirm() {
  confirmLayer.classList.toggle("d-none");
}
function hideConfrirm() {
  confirmLayer.style.animationName = "hide";
  setTimeout(() => {
    confirmLayer.classList.add("d-none");
    confirmLayer.style.animationName = "change-opacity";
  }, 300);
}
// function to search in data
searchInput.addEventListener("keyup", (letter) => {
  let arrAfterSearch = [];
  arrAfterSearch = arrOfProducts.filter((element) => {
    return (
      element.theName.includes(searchInput.value) ||
      element.theName.toUpperCase().includes(searchInput.value)
    );
  });
  displayProducts(arrAfterSearch);
});

// alert added
function alertAddedMsg() {
  let alertAdd = document.querySelector(".alert-added");
  alertAdd.textContent = "Success";
  alertAdd.style.right = "50px";
  alertAdd.classList.replace("bg-danger", "bg-success");
  setTimeout(() => {
    alertAdd.style.right = "-600px";
  }, 2000);
}
// alert eroor
function alertErorrMsg() {
  let alertAdd = document.querySelector(".alert-added");
  alertAdd.textContent = "Invalid Data";
  alertAdd.style.right = "50px";
  alertAdd.classList.replace("bg-success", "bg-danger");
  setTimeout(() => {
    alertAdd.style.right = "-600px";
  }, 2000);
}

// clear inputs
function clearInputs() {
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productQunatity.value = "";
  productName.classList.remove("is-valid", "is-invalid");
  productCategory.classList.remove("is-valid", "is-invalid");
  productPrice.classList.remove("is-valid", "is-invalid");
  productQunatity.classList.remove("is-valid", "is-invalid");
}
