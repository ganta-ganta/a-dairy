// Load Order History
function loadOrderHistory() {
    const orderHistory = document.getElementById("order-history");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        orderHistory.innerHTML = "<p>No past orders found.</p>";
        return;
    }

    // Generate HTML for each order
    orderHistory.innerHTML = orders
        .map(order => `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Order Date: ${order.date}</h5>
                    <div class="row">
                        ${order.orderDetails.split("\n").map(item => `
                            <div class="col-md-6">
                                <p>${item}</p>
                            </div>
                        `).join("")}
                    </div>
                    <hr>
                    <p><strong>Total:</strong> ₹${order.total}</p>
                </div>
            </div>
        `)
        .join('');
}

// Initialize the order history page
document.addEventListener("DOMContentLoaded", loadOrderHistory);
