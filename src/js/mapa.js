//Funcion para mostrar el mapa con
(function () {
  //@3.3798015,-76.5571309,3a,75
  const lat = 3.3798015;
  const lng = -76.5571309;
  const mapa = L.map("mapa").setView([lat, lng], 10);
  let marker;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);
  marker = new L.marker([lat, lng], {
    draggable: true,//permite mover el pin
    autoPan: true,//permite el autocentrado del mapa
  })
  .addTo(mapa)
})();
