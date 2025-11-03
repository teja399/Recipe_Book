const fs = require('fs');
const path = require('path');

// Path to the recipes directory
const recipesDir = path.join(__dirname, 'recipes');

// HTML snippets to add
const cartIconSnippet = `
                <li><a href="#" id="cart-icon" style="text-decoration: none;"><i class="fas fa-shopping-cart"></i> <span id="cart-count">0</span></a></li>`;

const cartButtonAndModalsSnippet = `
        <!-- Add to Cart Button -->
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn-primary" onclick="addIngredientsToCart()" style="padding: 12px 25px; font-size: 1.1em;">
                <i class="fas fa-shopping-cart"></i> Add Ingredients to Cart
            </button>
        </div>

        <script>
        function addIngredientsToCart() {
            // Get all ingredients from the page
            const ingredients = Array.from(document.querySelectorAll('.ingredient-item')).map(item => {
                return {
                    name: item.querySelector('h3').textContent.trim(),
                    quantity: item.querySelector('p').textContent.trim()
                };
            });
            
            // Add to cart
            if (window.addIngredientsToCart) {
                window.addIngredientsToCart(ingredients);
            } else {
                alert('Shopping cart not available. Please try again later.');
            }
        }
        </script>

        <!-- Shopping Cart Modals -->
        <div id="cart-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Your Shopping Cart</h2>
                <div id="cart-items">
                    <!-- Cart items will be added here dynamically -->
                </div>
                <div class="cart-total">
                    <h3>Total: ₹<span id="cart-total">0</span></h3>
                </div>
                <button id="checkout-btn" class="btn-primary">Proceed to Checkout</button>
            </div>
        </div>

        <!-- Checkout Form Modal -->
        <div id="checkout-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Checkout</h2>
                <form id="checkout-form">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="address">Delivery Address</label>
                        <textarea id="address" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Payment Method</label>
                        <div class="payment-methods">
                            <label><input type="radio" name="payment" value="cod" checked> Cash on Delivery</label>
                            <label><input type="radio" name="payment" value="card"> Credit/Debit Card</label>
                        </div>
                    </div>
                    <div id="card-details" style="display: none;">
                        <div class="form-group">
                            <label for="card-number">Card Number</label>
                            <input type="text" id="card-number" placeholder="1234 5678 9012 3456">
                        </div>
                        <div class="form-group-row">
                            <div class="form-group">
                                <label for="expiry">Expiry Date</label>
                                <input type="text" id="expiry" placeholder="MM/YY">
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123">
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn-primary">Place Order</button>
                </form>
            </div>
        </div>

        <!-- Order Confirmation Modal -->
        <div id="order-confirm" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="order-success">
                    <i class="fas fa-check-circle"></i>
                    <h2>Order Placed Successfully!</h2>
                    <p>Your order has been received and is being processed.</p>
                    <p>Order ID: <span id="order-id"></span></p>
                    <button id="close-order" class="btn-primary">Continue Shopping</button>
                </div>
            </div>
        </div>`;

// Function to process all HTML files in a directory recursively
function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (path.extname(file) === '.html' && !file.includes('index.html')) {
            updateRecipeFile(fullPath);
        }
    });
}

// Function to update a single recipe file
function updateRecipeFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add cart icon to navigation if not already present
        if (!content.includes('id="cart-icon"')) {
            content = content.replace(
                /<li><a href="[^"]*create_recipe\.html"[^>]*>Create Recipe<\/a><\/li>/,
                `$&${cartIconSnippet}`
            );
        }
        
        // Add cart button and modals if not already present
        if (!content.includes('addIngredientsToCart')) {
            // Insert cart button after the recipe table
            content = content.replace(
                /(<\/table>\s*<br>\s*)(<script)/,
                `$1${cartButtonAndModalsSnippet}\n$2`
            );
            
            // Make sure cart.js is included
            if (!content.includes('cart.js')) {
                content = content.replace(
                    /(<\/body>)/,
                    `    <script src="../../js/cart.js"></script>\n$1`
                );
            }
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Start processing from the recipes directory
processDirectory(recipesDir);
console.log('Recipe pages update complete!');
