// Load Cart
function loadCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    cartCount.innerText = cart.length; // Update cart count
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
    } else {
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div class="d-flex justify-content-between mb-2">
                    <div>${item.name}</div>
                    <div>₹${item.price}</div>
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
                </div>`;
            total += item.price;
        });
    }
    totalPrice.innerText = total;

    document.querySelectorAll(".remove-item").forEach(button =>
        button.addEventListener("click", removeFromCart)
    );
}

// Remove Item from Cart
function removeFromCart(event) {
    const index = parseInt(event.target.getAttribute("data-index"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Checkout Functionality
function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const orderDetails = cart.map((item) => `${item.name} - ₹${item.price}`).join("\n");
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const message = encodeURIComponent(`Hello, I'd like to order:\n${orderDetails}\nTotal: ₹${total}`);
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ orderDetails, total, date: new Date().toLocaleString() });
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("cart", JSON.stringify([]));
    loadCart();
    window.open(`https://wa.me/7993564948?text=${message}`);
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    document.getElementById("checkout-btn").addEventListener("click", checkout);
});
