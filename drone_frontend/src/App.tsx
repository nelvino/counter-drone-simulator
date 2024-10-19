import { useEffect, useState } from 'react'
import Map from './Map'
import './App.css'

const App = () => {
	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)
	useEffect(() => {
		const websocket = new WebSocket('ws://localhost:8080/')

		websocket.onopen = () => {
			console.log('Web Socket connected.')
		}

		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			setLatitude(data.latitude)
			setLongitude(data.longitude)
			console.log(data)
		}
	}, [])

	return <Map latitude={latitude} longitude={longitude} />
}

export default App
