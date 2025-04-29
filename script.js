const cart = {};
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartModal = document.getElementById('cart-modal');

const shirts = [
    { name: 'Camisa Brasil Retrô', img: 'images/camisa1.jpg' },
    { name: 'Camisa Santos Retrô', img: 'images/camisa2.jpg' }
];

const shoes = [
    { name: 'Chuteira Nike', img: 'images/chuteira1.jpg' },
    { name: 'Chuteira F50 Adidas', img: 'images/chuteira2.jpg' }
];

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <button onclick="addToCart('${product.name}')">Adicionar</button>
        `;
        container.appendChild(div);
    });
}

function addToCart(productName) {
    cart[productName] = (cart[productName] || 0) + 1;
    updateCart();
}

function removeFromCart(productName) {
    if (cart[productName]) {
        cart[productName]--;
        if (cart[productName] === 0) delete cart[productName];
        updateCart();
    }
}

function updateCart() {
    cartItems.innerHTML = '';
    let totalItems = 0;

    for (const [name, qty] of Object.entries(cart)) {
        totalItems += qty;
        const li = document.createElement('li');
        li.innerHTML = `
            ${name} - ${qty} 
            <button onclick="addToCart('${name}')">+</button>
            <button onclick="removeFromCart('${name}')">−</button>
        `;
        cartItems.appendChild(li);
    }

    cartCount.innerText = totalItems;
}

function checkout() {
    if (Object.keys(cart).length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let message = 'Olá! Gostaria de comprar:\n';
    for (const [name, qty] of Object.entries(cart)) {
        message += `- ${name} (x${qty})\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5567996948488';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

renderProducts(shirts, 'shirts');
renderProducts(shoes, 'shoes');
