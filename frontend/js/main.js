document.addEventListener('DOMContentLoaded', function() {
    showView('productos');
    loadProductList();
    loadSalesList();
    loadCartList();
});

function showView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
}

async function loadProductList() {
    const response = await fetch('http://localhost:3000/productos');
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product-item">
            <img src="${product.urlImagen}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p>${product.descripcion}</p>
            <p>Precio: $${product.precio}</p>
            <p>Stock: ${product.stock}</p>
        </div>
    `).join('');
}

async function loadSalesList() {
    const response = await fetch('http://localhost:3000/ventas');
    const sales = await response.json();
    const salesList = document.getElementById('sales-list');
    const totalSales = document.getElementById('total-sales');
    let total = 0;

    salesList.innerHTML = sales.map(sale => {
        total += sale.valor;
        return `
            <tr>
                <td>${new Date(sale.fecha).toLocaleDateString()}</td>
                <td>${sale.id}</td>
                <td>$${sale.valor}</td>
            </tr>
        `;
    }).join('');

    totalSales.textContent = total;
}

async function loadCartList() {
    // Implementar la lógica para obtener el carrito
}

async function finalizePurchase() {
    // Implementar la lógica para finalizar la compra
}

async function cancelPurchase() {
    // Implementar la lógica para cancelar la compra
}
