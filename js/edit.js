let productId = localStorage.getItem("editProductId");

let products = JSON.parse(localStorage.getItem("products"));

let product = products.find(p=>p.id == productId);

if(product){
    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("productImage").value = product.image;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productDescription").value = product.description;
}

function updateProduct(){
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const image = document.getElementById("productImage").value
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;

    let index = products.findIndex(p => p.id == id);
    if(products.findIndex(p => p.id == id) != -1){
        products[index] = {id, name, image, price, description};
        localStorage.setItem("products",JSON.stringify(products));
        localStorage.removeItem("editProductId");
        window.location.href = "index.html";
    }
}



