let productId = localStorage.getItem("editProductId");

let products = JSON.parse(localStorage.getItem("products"));

let product = products.find(p=>p.id == productId);

if(product){
    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productDescription").value = product.description;
}

document.getElementById("productImage").addEventListener("change", function () {
    let file = this.files[0];
    if(file){
        let reader = new FileReader();
        reader.onloadend = () => {
            localStorage.setItem("updatedImage" , reader.result);
        }
        reader.readAsDataURL(file);
    }
});

function updateProduct(){
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;

    let index = products.findIndex(p => p.id == id);
    if (index != -1) {
        let image =localStorage.getItem("updatedImage") || products[index].image;
        products[index] = {id, name, image, price, description};
        localStorage.setItem("products",JSON.stringify(products));
        localStorage.removeItem("editProductId");
        localStorage.removeItem("updatedImage");
        window.location.href = "index.html";
    }
}

document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    updateProduct();
})