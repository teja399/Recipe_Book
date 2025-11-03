// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // DOM Elements
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const orderConfirmModal = document.getElementById('order-confirm');
    const closeButtons = document.getElementsByClassName('close');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const closeOrderBtn = document.getElementById('close-order');
    const paymentMethods = document.getElementsByName('payment');
    const cardDetails = document.getElementById('card-details');
    
    // Update cart count in the UI
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }
    
    // Render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            checkoutBtn.style.display = 'none';
            cartTotal.textContent = '0';
            return;
        }
        
        checkoutBtn.style.display = 'block';
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        
        cartTotal.textContent = total.toFixed(2);
    }
    
    // Add item to cart
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        saveCart();
        updateCartCount();
        renderCart();
        showNotification('Item added to cart!');
    }
    
    // Remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        renderCart();
        showNotification('Item removed from cart');
    }
    
    // Update item quantity
    function updateQuantity(index, change) {
        const item = cart[index];
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(index);
        } else {
            saveCart();
            updateCartCount();
            renderCart();
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Event Listeners
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
        renderCart();
    });
    
    // Close modals when clicking the X button
    Array.from(closeButtons).forEach(button => {
        button.addEventListener('click', () => {
            cartModal.style.display = 'none';
            checkoutModal.style.display = 'none';
            orderConfirmModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
        if (e.target === orderConfirmModal) {
            orderConfirmModal.style.display = 'none';
        }
    });
    
    // Handle cart item actions (increase/decrease/remove)
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('remove-btn')) {
            const index = target.getAttribute('data-index');
            removeFromCart(parseInt(index));
        }
        
        if (target.classList.contains('quantity-btn')) {
            const index = target.getAttribute('data-index');
            const action = target.getAttribute('data-action');
            
            if (action === 'increase') {
                updateQuantity(parseInt(index), 1);
            } else if (action === 'decrease') {
                updateQuantity(parseInt(index), -1);
            }
        }
    });
    
    // Proceed to checkout
    checkoutBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'block';
        checkoutForm.reset();
    });
    
    // Toggle card details based on payment method
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
    
    // Handle form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real app, you would process the payment here
        // For this example, we'll just show the order confirmation
        
        // Generate a random order ID
        const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
        document.getElementById('order-id').textContent = orderId;
        
        // Show order confirmation
        checkoutModal.style.display = 'none';
        orderConfirmModal.style.display = 'block';
        
        // Clear the cart
        cart = [];
        saveCart();
        updateCartCount();
    });
    
    // Close order confirmation and return to shopping
    closeOrderBtn.addEventListener('click', () => {
        orderConfirmModal.style.display = 'none';
    });
    
    // Initialize cart
    updateCartCount();
    
    // Expose addToCart to global scope so it can be called from recipe pages
    window.addToCart = addToCart;
});

// Function to add ingredients to cart from recipe page
function addIngredientsToCart(ingredients) {
    // This function will be called from individual recipe pages
    // Each ingredient should be an object with {id, name, price, quantity}
    // For this example, we'll just add a fixed price
    ingredients.forEach(ingredient => {
        if (window.addToCart) {
            window.addToCart({
                id: 'ing-' + ingredient.name.toLowerCase().replace(/\s+/g, '-'),
                name: ingredient.name,
                price: 50, // Default price, you can adjust this
                quantity: 1
            });
        }
    });
    
    // Show the cart modal
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'block';
        // Re-render cart to show updated items
        if (window.renderCart) {
            window.renderCart();
        }
    }
}
