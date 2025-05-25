const discos = [
  { id: 1, nombre: "White Pony - Deftones", precio: 15.99 },
  { id: 2, nombre: "Hybrid Theory - Linkin Park", precio: 14.99 },
  { id: 3, nombre: "Issues - Korn", precio: 13.99 },
  { id: 4, nombre: "Chocolate Starfish - Limp Bizkit", precio: 12.99 },
  { id: 5, nombre: "Toxicity - System of a Down", precio: 14.49 },
  { id: 6, nombre: "Life Is Peachy - Korn", precio: 13.49 },
  { id: 7, nombre: "Meteora - Linkin Park", precio: 15.49 },
  { id: 8, nombre: "Significant Other - Limp Bizkit", precio: 12.99 },
  { id: 9, nombre: "Steal This Album! - System of a Down", precio: 13.99 },
  { id: 10, nombre: "Around the Fur - Deftones", precio: 16.49 }
];

const productosSection = document.getElementById('productos');
const cartItemsUl = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalSpan = document.getElementById('cart-total');
const btnClear = document.getElementById('btn-clear');
const btnCheckout = document.getElementById('btn-checkout');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderProductos() {
  productosSection.innerHTML = '';
  discos.forEach(disco => {
    // Crear contenedor producto
    const div = document.createElement('div');
    div.className = 'producto';

    // Checkbox
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `disco-${disco.id}`;
    input.checked = carrito.some(item => item.id === disco.id);

    // Cuando cambia checkbox
    input.addEventListener('change', () => {
      if (input.checked) {
        carrito.push(disco);
      } else {
        carrito = carrito.filter(item => item.id !== disco.id);
      }
      actualizarCarrito();
      guardarCarrito();
    });

    // Label para el checkbox
    const label = document.createElement('label');
    label.htmlFor = `disco-${disco.id}`;
    label.textContent = `${disco.nombre} - $${disco.precio.toFixed(2)}`;

    div.appendChild(input);
    div.appendChild(label);
    productosSection.appendChild(div);
  });
}

function actualizarCarrito() {
  cartItemsUl.innerHTML = '';
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    cartItemsUl.appendChild(li);
  });
  cartCountSpan.textContent = `(${carrito.length})`;
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  cartTotalSpan.textContent = total.toFixed(2);
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  localStorage.setItem('total', total.toFixed(2));
}

btnClear.addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
  guardarCarrito();
  renderProductos(); // Para desmarcar checkboxes
});

btnCheckout.addEventListener('click', () => {
  if(carrito.length === 0){
    alert('Por favor, selecciona al menos un disco para continuar con el pago.');
    return;
  }
  window.location.href = 'pago.html';
});

// Inicializar
renderProductos();
actualizarCarrito();
