//@ts-nocheck
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerIcon from "../../../../assets/images/marker-icon.png";

const MapForm = (props: { selectedLocation: string; onMapClick: ([number, number]) => void }) => {
  const [position, setPosition] = useState<[number, number]>([
    49.27326489299744, -123.10365200042726,
  ]);

  const customMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
  });

  useEffect(() => {
    if (props.selectedLocation) {
      // set selected location as current lcoation
      setPosition(props.selectedLocation);
      addMarkerAndNavigate(props.selectedLocation);
    }
  }, [props.selectedLocation]);

  const addMarkerAndNavigate = (location: string) => {
    setPosition(location); // Set new location
    props.onMapClick(location); // Trigger the map click event
  };

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        const clickedLocation = [e.latlng.lat, e.latlng.lng];
        setPosition(clickedLocation); // Add new position to the array
        props.onMapClick(clickedLocation);
      },
    });

    return (
      <Marker
        position={position}
        draggable={true}
        icon={customMarkerIcon}
        eventHandlers={{
          dragend: (e) => {
            const newPosition = [e.target.getLatLng().lat, e.target.getLatLng().lng];
            setPosition(newPosition);
            props.onMapClick(newPosition);
          },
        }}
      ></Marker>
    );
  };

  return (
    <MapContainer
      key={position.toString()}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <Markers />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapForm;
