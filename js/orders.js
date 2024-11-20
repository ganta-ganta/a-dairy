function loadOrderHistory() {
    const orderHistory = document.getElementById("order-history");
    const ordersRaw = localStorage.getItem("orders");
    console.log("Raw orders data:", ordersRaw); // Log raw data
    const orders = JSON.parse(ordersRaw) || [];
    console.log("Parsed orders array:", orders); // Log parsed data

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
                        ${order.items.map(item => `
                            <div class="col-md-3 text-center">
                                <img src="${item.image}" alt="${item.name}" class="img-fluid mb-2 rounded">
                                <p>${item.name}</p>
                                <p>Price: ₹${item.price}</p>
                            </div>
                        `).join('')}
                    </div>
                    <hr>
                    <p><strong>Total:</strong> ₹${order.total}</p>
                </div>
            </div>
        `)
        .join('');
}
