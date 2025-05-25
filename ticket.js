document.addEventListener('DOMContentLoaded', () => {
  let carrito = [];
  let total = 0;

  try {
    const carritoJSON = localStorage.getItem('carrito');
    if (carritoJSON) carrito = JSON.parse(carritoJSON);

    const totalStr = localStorage.getItem('total');
    if (totalStr) total = parseFloat(totalStr);
  } catch (e) {
    console.error('Error leyendo localStorage:', e);
  }

  const ticketList = document.getElementById('ticket-items');
  const totalSpan = document.getElementById('total-ticket');
  const orderId = document.getElementById('order-id');
  const fecha = document.getElementById('fecha');

  const date = new Date();
  fecha.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  orderId.textContent = '#' + String(Math.floor(100000 + Math.random() * 900000));

  if (carrito.length === 0) {
    const li = document.createElement('li');
    li.textContent = "No hay productos comprados.";
    ticketList.appendChild(li);
  } else {
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
      ticketList.appendChild(li);
    });
  }

  totalSpan.textContent = total.toFixed(2);

  // Opcional: limpiar el carrito tras mostrar el ticket
  // localStorage.removeItem('carrito');
  // localStorage.removeItem('total');
});
