import { useEffect, useState } from 'react'
import Map from './Map'
import './App.css'

const App = () => {
	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)
	const [dronePosition, setDronePosition] = useState<[number, number]>([0, 0])
	const [path, setPath] = useState<[number, number][]>([])

	useEffect(() => {
		const websocket = new WebSocket('ws://localhost:8080/')

		websocket.onopen = () => {
			console.log('Web Socket connected.')
		}

		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			const newPosition: [number, number] = [data.latitude, data.longitude]
			setLatitude(data.latitude)
			setLongitude(data.longitude)
			setDronePosition(newPosition)
			setPath((prevPath) => [...prevPath, newPosition])
			console.log(data)
		}
	}, [dronePosition])

	return <Map latitude={latitude} longitude={longitude} path={path} />
}

export default App
