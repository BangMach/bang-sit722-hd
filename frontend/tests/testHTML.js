// Test HTML template for DOM testing
const testHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test E-commerce Application</title>
</head>
<body>
    <div id="message-box" class="message-box" style="display: none;"></div>
    
    <!-- Product Form -->
    <form id="product-form">
        <input type="text" id="product-name" placeholder="Product Name">
        <textarea id="product-description" placeholder="Product Description"></textarea>
        <input type="number" id="product-price" placeholder="Product Price" step="0.01">
        <input type="number" id="product-stock" placeholder="Stock Quantity">
        <button type="submit">Add Product</button>
    </form>
    
    <!-- Product List -->
    <div id="product-list"></div>
    
    <!-- Customer Form -->
    <form id="customer-form">
        <input type="text" id="customer-name" placeholder="Customer Name">
        <input type="email" id="customer-email" placeholder="Customer Email">
        <input type="text" id="customer-phone" placeholder="Customer Phone">
        <textarea id="customer-address" placeholder="Customer Address"></textarea>
        <button type="submit">Add Customer</button>
    </form>
    
    <!-- Customer List -->
    <div id="customer-list"></div>
    
    <!-- Shopping Cart -->
    <ul id="cart-items"></ul>
    <span id="cart-total">$0.00</span>
    
    <!-- Place Order Form -->
    <form id="place-order-form">
        <select id="customer-select">
            <option value="">Select Customer</option>
        </select>
        <button type="submit">Place Order</button>
    </form>
    
    <!-- Order List -->
    <div id="order-list"></div>
</body>
</html>
`;

module.exports = testHTML;