let products = JSON.parse(localStorage.getItem("products")) || []

showProducts()

function showProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        productList.innerHTML += `
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

    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById("productImage").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    if (!name || !price || !description) {
        alert("Please fill in all details");
        return;
    }

    if (id) {
        products[id] = { id: parseInt(id) + 1, name, image, price, description };
    }
    else {
        let lastId = products.length > 0 ? products[products.length - 1].id : 0;
        products.push({
            id: lastId  + 1,
            name,
            image,
            price,
            description
        });
    }

    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";

    showProducts();
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        showProducts();
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
        console.log(products)
    }
    if (option === "name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (option === "id") {
        products.sort((a, b) => a.id - b.id)
    }
    showProducts();
}

function filterProducts() {
    const searchId = document.getElementById("searchId").value;
    let searchProduct = products.filter(product => product.id.toString().includes(searchId));
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    searchProduct.forEach((product, index) => {
        productList.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td><img src="${product.image}" alt="Product Image"></td>
                <td>$${product.price}</td>
                <td>${product.description}</td>
                <td>
                    <button onclick="editProduct(${index})">Edit</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}