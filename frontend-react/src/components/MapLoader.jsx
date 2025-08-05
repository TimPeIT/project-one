import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export default function MapLoader({ lat, lng }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      if (!mapRef.current) return;
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
      });

      new google.maps.Marker({
        position: { lat, lng },
        map,
      });
    });
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{ height: "300px", width: "100%", borderRadius: "0.5rem", border: "1px solid #ccc" }}
    />
  );
}
