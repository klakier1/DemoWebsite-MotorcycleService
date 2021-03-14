// Initialize and add the map
function initMap() {
  // The location
  const loc = { lat: 50.302492, lng: 18.872161 };
  // The map, centered at loc
  const map = new google.maps.Map(document.getElementById("contact-map"), {
    zoom: 15,
    center: loc,
  });
  // The marker, positioned
  const marker = new google.maps.Marker({
    position: loc,
    map: map,
  });
}
