const products = [
    { id: 1, name: "Romantic Rose", category: "love", price: 29.99, rating: 5, image: "https://i.pinimg.com/236x/ac/f5/01/acf501b117630260ac5f83777d128d3e.jpg" },
    { id: 2, name: "Birthday Special", category: "birthday", price: 49.99, rating: 4, image: "https://assets.intleflorist.com/site/in3300070/assets/products/PHR_/skuinsku1490043.jpg?1708362132542" },
    { id: 3, name: "Anniversary Flowers", category: "anniversary", price: 59.99, rating: 4, image: "https://perfectgiftadda.com/wp-content/uploads/2023/11/IMG_0503-scaled.jpeg" },
    { id: 4, name: "Elegant Lily", category: "friend", price: 59.99, rating: 4, image: "https://www.suvasa.in/media/catalog/product/cache/8ce22989caef6bbbeab1438da71c7d81/l/i/light_pink_3.jpg" },
    { id: 5, name: "Pleasant flowers", category: "wedding", price: 79.99, rating: 5, image: "https://sarahsflowers.co.uk/cdn/shop/products/BridesYellowSIlkSunflowerHydrangeaIvoryDaisyPeonyRoseWeddingShower_1080x.jpg?v=1624448617" },
    { id: 6, name: "Beautiful Rose Bouquet", category: "friend", price: 49.99, rating: 4, image: "https://cloudinary-a.akamaihd.net/ufn/image/upload/bo0olgj4qkfmtquqghod.jpg" },
    { id: 7, name: "Wedding Special", category: "wedding", price: 89.99, rating: 4, image: "https://i.pinimg.com/originals/23/33/d7/2333d7293fa872bd657778d355ccf517.jpg" },
    { id: 8, name: "Tulip Flowers", category: "friend", price: 49.99, rating: 5, image: "https://www.floweruk.co.uk/urunler/red-tulip-bouquet.jpg" },
    { id: 9, name: "Lotus Flowers", category: "wedding", price: 69.99, rating: 4, image: "https://132238837.cdn6.editmysite.com/uploads/1/3/2/2/132238837/s404764999595081428_p6_i1_w2560.jpeg?width=2400&optimize=medium" },
    { id: 10, name: "Cheerful Sunflowers", category: "birthday", price: 59.99, rating: 3, image: "https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1713561694/vendor/5441/catalog/product/2/0/20201015024333_file_5f88601559b15_5f8861203353e.jpg" },
    { id: 11, name: "Beautiful Flowers", category: "anniversary", price: 69.99, rating: 3, image: "https://i.pinimg.com/736x/66/e3/8d/66e38d199813b190b8430e081e7a5366.jpg" },
    { id: 12, name: "Pink Rose", category: "love", price: 29.99, rating: 5, image: "https://i.pinimg.com/736x/d0/64/71/d0647160fd7047ffb4ab048270562641.jpg" }
];

let cart = [];

// Function to display products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        
        // Create a string of stars based on the rating
        const ratingStars = getRatingStars(product.rating);
        
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="rating">${ratingStars}</div>  <!-- Display stars as read-only -->
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Function to generate star rating based on the product rating
function getRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += `<span class="star filled">★</span>`; // Full star
        } else {
            stars += `<span class="star empty">☆</span>`; // Empty star
        }
    }
    return stars;
}

// Function to add product to the cart
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    cart.push(product);

    updateCart();
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear the current cart items

    let total = 0;

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="remove-btn" data-id="${product.id}">Remove</div>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Update total
        total += product.price;

        // Add event listener to remove button
        cartItem.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(product.id));
    });

    // Update total price
    document.getElementById('cart-total').textContent = total.toFixed(2);

    // Disable "Clear Cart" button if cart is empty
    document.getElementById('clear-cart-btn').disabled = cart.length === 0;
}

// Function to clear the cart
function clearCart() {
    cart = []; // Empty the cart
    updateCart(); // Update the cart display
}

// Update event listener for the 'Clear Cart' button
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

// Filtering and Sorting products based on category and price
document.getElementById('category-filter').addEventListener('change', function () {
    const category = this.value;
    const priceSort = document.getElementById('price-filter').value;

    let filteredProducts = products.filter(product => category ? product.category === category : true);

    if (priceSort === 'low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
});

// Sorting products by price without category change
document.getElementById('price-filter').addEventListener('change', function () {
    const priceSort = this.value;
    const category = document.getElementById('category-filter').value;

    let sortedProducts = products.filter(product => category ? product.category === category : true);

    if (priceSort === 'low') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(sortedProducts);
});

// Initial display of all products
displayProducts(products);

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Message sent from:', name, email);
    console.log('Message:', message);

    alert('Thank you for contacting us!');
    document.getElementById('contact-form').reset(); // Reset form
});
