// Diese Funktion wird von Google Maps aufgerufen, wenn die API geladen ist
function initmap() {
    const center = { lat: 52.5200, lng: 13.4050 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: center,
    });

    // Restaurants (kann mit der API ersetzt)
    
 // Marker setzen
  restaurants.forEach(r => {
    const marker = new google.maps.Marker({
      position: { lat: r.lat, lng: r.lng },
      map: map,
      title: r.name,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: `<div>
        <h5>${r.name}</h5>
        <p>Kontakt: ${r.kontakt}</p>
        <button onclick="zeigeRestaurantDetails('${r.name}', '${r.kontakt}')">Details</button>
      </div>`,
    });
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
}

// Funktion für mehr Infos (kann später erweitert werden)
function zeigeRestaurantDetails(name, kontakt, bewertung) {
    alert(`Restaurant: ${name}\nKontakt}: ${kontakt}\nHier kann man z.B. die Speisekarte, Rezensionen etc. anzeigen.)`);
}
