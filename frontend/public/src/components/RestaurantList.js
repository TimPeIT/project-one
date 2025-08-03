function RestaurantList() {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchRestaurants = async () => {
    const city = document.querySelector('input[placeholder="Postleitzahl"]').value;
    const cuisine = document.querySelector('input[placeholder="Gericht oder Land suchen..."]').value;
    const radius = document.querySelector('input[placeholder="Radius (km)"]').value;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/places/search?city=${city}&cuisine=${cuisine}&radius=${radius}`);
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      console.error("Fehler beim Abrufen:", err);
    } finally {
      setLoading(false);
    }
  };

  // Event-Listener für "Suchen"-Button
  React.useEffect(() => {
    const searchBtn = document.querySelector('.btn.btn-primary.w-100');
    searchBtn.addEventListener('click', fetchRestaurants);
    return () => searchBtn.removeEventListener('click', fetchRestaurants);
  }, []);

  return (
    <div className="card p-4 shadow">
      <h4 className="mb-3">Gefundene Restaurants</h4>
      {loading ? (
        <p>Lade Restaurants...</p>
      ) : (
        <ul className="list-group">
          {restaurants.map((res) => (
            <RestaurantItem key={res.id} restaurant={res} />
          ))}
        </ul>
      )}
    </div>
  );
}
