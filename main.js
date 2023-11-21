var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var productList;
var currentIndex;

if (localStorage.getItem('productStorage') != null) {
    productList = JSON.parse(localStorage.getItem('productStorage'));
    displayProducts(productList)
} else {
    productList = [];
}
function addProduct() {
    if (validateProductName() == true) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDesc.value
        }
        productList.push(product);
        localStorage.setItem('productStorage', JSON.stringify(productList));
        clearForm();
        displayProducts(productList);
    } else {
        alert('In-Valid Input')
    }
}
function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
}
function displayProducts(List) {
    var box = ``;
    for (var i = 0; i < List.length; i++) {
        box += `<tr><td>${i + 1}</td>
        <td>${List[i].name}</td>
        <td>${List[i].price}</td>
        <td>${List[i].category}</td>
        <td>${List[i].desc}</td>
        <td><button onclick='updateProduct(${i})' class="btn btn-sm btn-warning">Update</button></td>
        <td><button onclick='deleteProduct(${i})' class="btn btn-sm btn-danger">Delete</button></td></tr>`
    }
    document.getElementById('tablebody').innerHTML = box;
}

function searchProduct(term) {
    var searchResult = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchResult.push(productList[i]);
        }
    }
    displayProducts(searchResult);
}

function deleteProduct(deletedIndex) {
    productList.splice(deletedIndex, 1);
    localStorage.setItem('productStorage', JSON.stringify(productList));
    displayProducts(productList)
}
function updateProduct(updatedIndex) {
    currentIndex = updatedIndex;
    productName.value = productList[updatedIndex].name;
    productPrice.value = productList[updatedIndex].price;
    productCategory.value = productList[updatedIndex].category;
    productDesc.value = productList[updatedIndex].desc;
    updateBtn.classList.replace('d-none', 'd-inline-block')
    addBtn.classList.add('d-none')
    localStorage.setItem('productStorage', JSON.stringify(productList));
    displayProducts(productList)
}

function edit() {
    productList[currentIndex].name = productName.value;
    productList[currentIndex].price = productPrice.value;
    productList[currentIndex].category = productCategory.value;
    productList[currentIndex].desc= productDesc.value ;
    updateBtn.classList.replace('d-inline-block', 'd-none')
    addBtn.classList.replace('d-none', 'd-inline-block')
    localStorage.setItem('productStorage', JSON.stringify(productList));
    displayProducts(productList);
    clearForm();
}
function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}[0-9]{0,2}$/;
    if (regex.test(productName.value) == true) {
        productName.classList.replace('is-invalid','is-valid');
        return true;
    } else {
        productName.classList.add('is-invalid')
        return false;
    }
  }