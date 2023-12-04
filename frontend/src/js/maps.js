let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 38.6929488, lng: -4.1111371 },
    zoom: 16,
  });
}

initMap();