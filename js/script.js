let products = JSON.parse(localStorage.getItem("products")) || []

showProducts()

function showProducts(){
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product,index) => {
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

    localStorage.setItem("products",JSON.stringify(products));
}

function addOrUpdateProduct(){
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById("productImage").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    if(!name || !price || !description){
        alert("Please fill in all details");
        return;
    }

    if(id){
        products[id] = {id: parseInt(id) + 1,name,image,price,description};
    }
    else{
        products.push({
            id: products.length + 1,
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

function deleteProduct(index){
    if(confirm("Are you sure you want to delete this product?")){
        products.splice(index,1);
        showProducts();
    }
}

function editProduct(index){
    localStorage.setItem("editProductId",index);
    window.location.href = "edit.html";
}
