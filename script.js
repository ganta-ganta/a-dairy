// Sample Product Data
const products = [
  { id: 1, name: "Product 1", price: 100, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", price: 200, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", price: 300, image: "https://via.placeholder.com/150" },
];

// Load products into the product list
function loadProducts() {
  const productList = document.getElementById("product-list");
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

  // Add click event to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) =>
    button.addEventListener("click", addToCart)
  );
}

// Add to Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart(event) {
  const productId = parseInt(event.target.getAttribute("data-id"));
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Load Cart
function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
  } else {
    cart.forEach((item, index) => {
      const cartItem = `
        <div class="d-flex justify-content-between mb-2">
          <div>${item.name}</div>
          <div>₹${item.price}</div>
          <button class="btn btn-sm btn-danger remove-item" data-index="${index}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>`;
      cartItems.innerHTML += cartItem;
      total += item.price;
    });
  }

  totalPrice.innerText = total;

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-item").forEach((button) =>
    button.addEventListener("click", removeFromCart)
  );
}

// Remove item from Cart
function removeFromCart(event) {
  const index = parseInt(event.target.getAttribute("data-index"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Checkout functionality
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderDetails = cart.map((item) => `${item.name} - ₹${item.price}`).join("\n");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const message = encodeURIComponent(
    `Hello, I would like to place an order:\n\n${orderDetails}\n\nTotal: ₹${total}`
  );

  // Save order to local storage
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({ orderDetails, total, date: new Date().toLocaleString() });
  localStorage.setItem("orders", JSON.stringify(orders));

  // Clear the cart after checkout
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();

  // Open WhatsApp with pre-filled message
  window.open(`https://wa.me/7993564948?text=${message}`);
  loadOrderHistory();
}

// Load Order History
function loadOrderHistory() {
  const orderHistory = document.getElementById("order-history");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    orderHistory.innerHTML = "<p>No past orders found.</p>";
  } else {
    orderHistory.innerHTML = orders
      .map(
        (order) => `
        <div class="mb-3">
          <p><strong>Order Date:</strong> ${order.date}</p>
          <p>${order.orderDetails.replace(/\n/g, "<br>")}</p>
          <p><strong>Total:</strong> ₹${order.total}</p>
          <hr>
        </div>`
      )
      .join("");
  }
}


// Attach event listener to Checkout button
document.getElementById("checkout-btn").addEventListener("click", checkout);

// Load products, cart, and order history on page load
loadProducts();
loadCart();
loadOrderHistory();
