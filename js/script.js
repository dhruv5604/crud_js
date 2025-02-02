let products = JSON.parse(localStorage.getItem("products")) || []

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
                    <button onclick="editProduct(${index})">Edit</button>
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
    const desc = document.getElementById("productDescription").value.trim();

    if(!name || !price || !desc){
        alert("Please fill in all details");
        return;
    }

    if(id){
        products[id] = {id: parseInt(id) + 1,name,image,price,desc};
    }
    else{
        products.push({
            id: products.length + 1,
            name,
            image,
            price,
            desc
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
    const product = products[index];

    document.getElementById("productId").value = index;
    document.getElementById("productName").value = product.name;
    document.getElementById("productImage").value = product.image;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productDescription").value = product.description;
}

