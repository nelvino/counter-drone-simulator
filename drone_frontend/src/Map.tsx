import { useEffect, useState } from 'react'
import { MapContainer, Polyline, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { MarkerLayer, Marker } from 'react-leaflet-marker'
import DroneMarker from './DroneMarker'
import FollowDroneCheckbox from './FollowDroneCheckbox'

const mapStyles = {
	height: 'calc(100vh)',
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
			<FollowDroneCheckbox
				followDrone={followDrone}
				setFollowDrone={setFollowDrone}
			/>
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
