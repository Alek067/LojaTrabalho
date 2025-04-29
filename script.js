const cart = {};
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartModal = document.getElementById('cart-modal');

const shirts = [
    { name: 'Camisa Brasil Retrô', img: 'images/camisa1.jpg', price: 129.90 },
    { name: 'Camisa Santos Retrô', img: 'images/camisa2.jpg', price: 119.90 }
];

const shoes = [
    { name: 'Chuteira Nike', img: 'images/chuteira1.jpg', price: 399.90 },
    { name: 'Chuteira F50 Adidas', img: 'images/chuteira2.jpg', price: 359.90 }
];

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Adicionar</button>
        `;
        container.appendChild(div);
    });
}

function addToCart(productName, price = 0) {
    if (!cart[productName]) {
        cart[productName] = { qty: 0, price };
    }
    cart[productName].qty += 1;
    updateCart();
}

function removeFromCart(productName) {
    if (cart[productName]) {
        cart[productName].qty--;
        if (cart[productName].qty === 0) delete cart[productName];
        updateCart();
    }
}

function updateCart() {
    cartItems.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    for (const [name, data] of Object.entries(cart)) {
        totalItems += data.qty;
        totalPrice += data.qty * data.price;

        const li = document.createElement('li');
        li.innerHTML = `
            ${name} - ${data.qty}x (R$ ${(data.price).toFixed(2)})
            <button onclick="addToCart('${name}', ${data.price})">+</button>
            <button onclick="removeFromCart('${name}')">−</button>
        `;
        cartItems.appendChild(li);
    }

    cartItems.innerHTML += `<hr><strong>Total: R$ ${totalPrice.toFixed(2)}</strong>`;
    cartCount.innerText = totalItems;
}

function checkout() {
    if (Object.keys(cart).length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let message = 'Olá! Gostaria de comprar:\n';
    for (const [name, data] of Object.entries(cart)) {
        message += `- ${name} (x${data.qty}) - R$ ${(data.qty * data.price).toFixed(2)}\n`;
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
