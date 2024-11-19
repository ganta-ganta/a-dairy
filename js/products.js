const products = [
    { id: 1, name: "Buffalo's milk - 1-liter", price: 89, offerPrice: 79, image: "img/milk.png" },
    { id: 2, name: "Cow's Milk 1-Liter", price: 99, offerPrice: 89, image: "img/milk.png" },
    { id: 3, name: "Ghee -1-liter", price: 700, offerPrice: 650, image: "img/ghee.png" },
    { id: 4, name: "Milk-shake 1-liter", price: 60, offerPrice: 55, image: "img/milkshake.png" },
    { id: 5, name: "Ice-cream", price: 259, offerPrice: 229, image: "img/icecream.png" },
    { id: 6, name: "vegitable-juice", price: 49, offerPrice: 29, image: "img/juice.png" },
];


function loadProducts() {
    const productList = document.getElementById("product-list");
    const cartCount = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.length; // Update cart count
    productList.innerHTML = "";

    products.forEach((product) => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Price: ₹${product.price}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>`;
        productList.innerHTML += card;
    });

    document.querySelectorAll(".add-to-cart").forEach(button =>
        button.addEventListener("click", addToCart)
    );
}

function addToCart(event) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    const product = products.find((p) => p.id === productId);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    const cartCount = document.getElementById("cart-count");
    cartCount.innerText = cart.length; // Update cart count  Domestic Cow's Milk (1 liter) - ₹100
}

document.addEventListener("DOMContentLoaded", loadProducts);
