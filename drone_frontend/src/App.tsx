import { useEffect } from 'react'
import Map from './Map'
import './App.css'

const App = () => {
	useEffect(() => {
		const websocket = new WebSocket('ws://localhost:8080/')

		try {
			websocket.onopen = () => {
				console.log('Web Socket connected.')
			}

			websocket.onmessage = (event) => {
				const data = JSON.parse(event.data)
				console.log(data)
			}
		} catch (e) {
			console.log('Web socket connection error: ', e)
		}
	}, [])

	return <Map />
}

export default App
