// Initialize and add the map
let map;
let marker;

async function initMap() {
  // The location of Uluru
  var initialPosition = { lat: 38.69296294925023, lng: -4.10863995552063 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at initial position
  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center: initialPosition,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at initial position
  marker = new google.maps.Marker({
    position: initialPosition,
    title: "Uluru",
    draggable: true, // make the marker draggable
    map: map,
  });

  // Add a dragend event listener to the marker
  marker.addListener("dragend", (event) => {
    // Update the marker position based on the dragged coordinates
    updateMarkerPosition(event.latLng);
  });

  // Add a click event listener to the map
  map.addListener("click", (event) => {
    // Update the marker position based on the clicked coordinates
    updateMarkerPosition(event.latLng);
  });
}

// Function to update the marker position
function updateMarkerPosition(latLng) {
  marker.setPosition(latLng);
  map.panTo(latLng);

  // Mostrar latitud y longitud en la consola
  console.log("Latitud:", latLng.lat(), "Longitud:", latLng.lng());
  initialPosition = { lat:  latLng.lat(), lng: latLng.lng() };
  
}

initMap();
