const cart = [];
const cartCount = document.getElementById('cart-count');

// Produtos atualizados
const shirts = [
    { name: 'Camisa Brasil Retrô', img: 'imagens/camisa1.jpg' },
    { name: 'Camisa Santos Retrô', img: 'imagens/camisa2.jpg' }
];

const shoes = [
    { name: 'Chuteira Nike', img: 'imagens/chuteira1.jpg' },
    { name: 'Chuteira F50 Adidas', img: 'imagens/chuteira2.jpg' }
];

// Função para renderizar produtos
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
    cart.push(productName);
    cartCount.innerText = cart.length;
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const message = `Olá! Gostaria de comprar:\n- ${cart.join('\n- ')}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5567996948488'; // Seu número
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Inicializa
renderProducts(shirts, 'shirts');
renderProducts(shoes, 'shoes');
