import { useEffect, useState } from 'react'
import { MapContainer, Polyline, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { MarkerLayer, Marker } from 'react-leaflet-marker'
import DroneMarker from './DroneMarker'

const mapStyles = {
	height: 'calc(100vh)',
}

const checkboxStyles: React.CSSProperties = {
	position: 'absolute',
	top: 20,
	right: 10,
	zIndex: 1000,
	backgroundColor: 'white',
	padding: 5,
}

interface MapProps {
	latitude: number
	longitude: number
	path: [number, number][]
}

interface DroneMapAutoFollowProps {
	latitude: number
	longitude: number
	followDrone: boolean
}

const DroneMapAutoFollow = ({
	latitude,
	longitude,
	followDrone,
}: DroneMapAutoFollowProps) => {
	const map = useMap()

	useEffect(() => {
		if (followDrone) {
			map.setView([latitude, longitude], map.getZoom())
		}
	}, [latitude, longitude, map, followDrone])

	return null
}
const Map = ({ latitude, longitude, path }: MapProps) => {
	const [followDrone, setFollowDrone] = useState(false)

	return (
		<MapContainer
			center={[-33.946765, 151.1796423]}
			zoom={14}
			scrollWheelZoom={false}
			style={mapStyles}
		>
			<div style={checkboxStyles}>
				<label>
					<input
						type='checkbox'
						checked={followDrone}
						onChange={() => setFollowDrone(!followDrone)}
					/>
					Follow Drone
				</label>
			</div>
			<TileLayer
				attribution=''
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<MarkerLayer>
				<Marker position={[latitude, longitude]}>
					<DroneMarker />
					<Polyline
						pathOptions={{ dashArray: '5, 10', color: 'red' }}
						positions={path}
					/>
				</Marker>
			</MarkerLayer>
			<DroneMapAutoFollow
				latitude={latitude}
				longitude={longitude}
				followDrone={followDrone}
			/>
		</MapContainer>
	)
}

export default Map
