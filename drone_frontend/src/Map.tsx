import { FC } from "react";
import styled from "@emotion/styled";

import "./Map.css"; // Default Leaflet styles
import { MapContainer, TileLayer } from "react-leaflet";
import { MarkerLayer, Marker } from "react-leaflet-marker";
import DroneMarker from "./DroneMarker";

const StyledMap = styled(MapContainer)`
  height: calc(100vh);
  position: relative;
`;

const Map: FC = () => {
  return (
      <StyledMap
        center={[-33.946765, 151.1796423]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer attribution="" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerLayer>
          <Marker position={[-33.946765, 151.1796423]}>
            <DroneMarker />
          </Marker>
        </MarkerLayer>
      </StyledMap>
  );
};

export default Map;
