let cart = [];

function addToCart(productName) {
    cart.push(productName);
    document.getElementById('cart-count').innerText = cart.length;
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const message = encodeURIComponent(`Olá! Gostaria de comprar: ${cart.join(', ')}`);
    window.open(`https://wa.me/5567996948488?text=${message}`, '_blank');
}
