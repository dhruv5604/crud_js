let products = JSON.parse(localStorage.getItem("products")) || []

showProducts(products)

function showProducts(products) {
    const productList = document.getElementById("product-list");
    // let productListHtml = '';
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

    // productList.insertAdjacentHTML('afterbegin', productListHtml)
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

document.querySelectorAll(".sort-btn").forEach((sortBtn) => {
    sortBtn.addEventListener("click", () => {
        let tempProducts = [...products];
        let sortType = sortBtn.dataset.sort;
        let sortOrder = sortBtn.dataset.order || "asc"; // Default order is ascending

        const sortMethods = {
            id: (a, b) => a.id - b.id,
            name: (a, b) => a.name.localeCompare(b.name),
            price: (a, b) => a.price - b.price
        };

        if (sortOrder === "asc") {
            tempProducts.sort(sortMethods[sortType]);
            sortBtn.dataset.order = "desc";
            sortBtn.innerHTML = `<i class="fa-solid fa-sort-up"></i>`;
        } else if (sortOrder === "desc") {
            tempProducts.sort((a, b) => sortMethods[sortType](b, a));
            sortBtn.dataset.order = "none";
            sortBtn.innerHTML = `<i class="fa-solid fa-sort-down"></i>`;
        } else {
            tempProducts = [...products];
            sortBtn.dataset.order = "asc";
            sortBtn.innerHTML = `<i class="fa-solid fa-sort"></i>`;
        }
        showProducts(tempProducts);
    });
});
