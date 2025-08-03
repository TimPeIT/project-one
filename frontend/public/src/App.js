// Diese Funktion wird von Google Maps aufgerufen, wenn die API geladen ist
async function init() {
  await customElements.whenDefined('gmp-map');

  const map = document.querySelector('gmp-map');
  const marker = document.querySelector('gmp-advanced-marker');
  const placePicker = document.querySelector('gmpx-place-picker');
  const infowindow = new google.maps.InfoWindow();

  map.innerMap.setOptions({
    mapTypeControl: false
  });

  placePicker.addEventListener('gmpx-placechange', () => {
    const place = placePicker.value;

    if (!place.location) {
      window.alert(
        "No details available for input: '" + place.name + "'"
      );
      infowindow.close();
      marker.position = null;
      return;
    }

    if (place.viewport) {
      map.innerMap.fitBounds(place.viewport);
    } else {
      map.center = place.location;
      map.zoom = 17;
    }

    marker.position = place.location;
    infowindow.setContent(
      `<strong>${place.displayName}</strong><br>
       <span>${place.formattedAddress}</span>
    `);
    infowindow.open(map.innerMap, marker);
  });
}

document.addEventListener('DOMContentLoaded', init); // Restaurants (kann mit der API ersetzt)
    
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


// Funktion für mehr Infos (kann später erweitert werden)
function zeigeRestaurantDetails(name, kontakt, bewertung) {
    alert(`Restaurant: ${name}\nKontakt}: ${kontakt}\nBewertung: ${bewertung}Hier kann man z.B. die Speisekarte, Rezensionen etc. anzeigen.)`);
}

// Uhrzeit und Datum
function zeigeUhr() {
  const uhrDiv = document.getElementById('uhr');
  setInterval(() => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeStr= now.toLocaleTimeString('de-DE', options);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('de-DE', dateOptions);
    uhrDiv.innerHTML = `<strong>${dateStr}</strong><br>${timeStr}`;
  }, 1000);
}

zeigeUhr();


// benötigen wir eigentlich nicht mehr 