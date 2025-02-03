let products = JSON.parse(localStorage.getItem("products")) || []

showProducts(products)

function showProducts(products) {
    const productList = document.getElementById("product-list");
    let productListHtml = '';
    // productList.innerHTML = "";

    products.forEach((product, index) => {
        productListHtml += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td><img src="${product.image}" alt="Product Image"></td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Edit</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    productList.insertAdjacentHTML('afterbegin', productListHtml)
}

function addProduct() {
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById("productImage");
    const description = document.getElementById("productDescription").value.trim();

    if (!name || !price || !description) {
        alert("Please fill in all details");
        return;
    }
    let file = image.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
        let imageBase64 = reader.result;
        let lastId = products.length > 0 ? products[products.length - 1].id : 0;
        console.log(products);
        console.log(JSON.parse(localStorage.getItem("products")))
        
        products.push({
            id: parseInt(lastId) + 1,
            name,
            image: imageBase64,
            price,
            description
        });
        localStorage.setItem("products", JSON.stringify(products));
        showProducts(products);
    }

    document.getElementById("productName").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";


    reader.readAsDataURL(file);
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        showProducts(products);
        localStorage.setItem("products", JSON.stringify(products));
    }
}

function editProduct(index) {
    localStorage.setItem("editProductId", index);
    window.location.href = "edit.html";
}

function sortProducts() {
    let option = document.getElementById("sortOption").value;

    if (option === "price") {
        products.sort((a, b) => a.price - b.price);
    }
    else if (option === "name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
        products.sort((a, b) => a.id - b.id)
    }
    showProducts(products);
    localStorage.setItem("products", JSON.stringify(products));
}

function filterProducts() {
    const searchId = document.getElementById("searchId").value;
    let searchProduct = products.filter(product => product.id.toString().includes(searchId) || product.name.includes(searchId));

    showProducts(searchProduct);
    localStorage.setItem("products", JSON.stringify(products));
}

document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct();
})

let sortBtns = document.getElementsByClassName("sort-btn");
// let tempProducts = products;
let tempProducts = [...products];

for (let sortBtn of sortBtns) {
    sortBtn.addEventListener("click", () => {
        
        if (sortBtn.value == "sortId") {
            tempProducts.sort((a, b) => a.id - b.id);
            sortBtn.innerHTML = '<i class="fa-solid fa-sort-up"></i>';
            sortBtn.value = "sortIdUp";
        } else if (sortBtn.value == "sortIdUp") {
            tempProducts.sort((a, b) => b.id - a.id);
            sortBtn.innerHTML = '<i class="fa-solid fa-sort-down"></i>';
            sortBtn.value = "sortIdDown";
        } else if (sortBtn.value == "sortIdDown") {
            tempProducts.sort((a, b) => a.id - b.id);
            sortBtn.innerHTML = '<i class="fa-solid fa-sort"></i>';
            sortBtn.value = "sortId";
        } else if (sortBtn.value == "sortName") {
            tempProducts.sort((a, b) => a.name.localeCompare(b.name));
            console.log("products",products);
            console.log(tempProducts);
            sortBtn.innerHTML = '<i class="fa-solid fa-sort-up"></i>';
            sortBtn.value = "sortNameUp";
        } else if (sortBtn.value == "sortNameUp") {
            tempProducts.sort((a, b) => b.name.localeCompare(a.name));
            sortBtn.innerHTML = '<i class="fa-solid fa-sort-down"></i>';
            console.log("products",products);
            console.log(tempProducts);
            sortBtn.value = "sortNameDown";
        } else if (sortBtn.value == "sortNameDown") {
            tempProducts = products;
            console.log("products",products);
            console.log(tempProducts);
            sortBtn.innerHTML = '<i class="fa-solid fa-sort"></i>';
            sortBtn.value = "sortName";
        }
        showProducts(tempProducts);
    })

}