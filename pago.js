document.getElementById('form-pago').addEventListener('submit', function(e) {
  e.preventDefault();

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if(carrito.length === 0) {
    alert('No hay productos en el carrito para pagar.');
    return;
  }

  const direccion = document.getElementById('direccion').value.trim();
  const tarjeta = document.getElementById('tarjeta').value.trim();

  if(direccion === '' || tarjeta.length !== 16) {
    alert('Por favor, ingresa datos válidos.');
    return;
  }

  localStorage.setItem('direccion', direccion);
  localStorage.setItem('tarjeta', tarjeta);


  window.location.href = 'ticket.html';
});
