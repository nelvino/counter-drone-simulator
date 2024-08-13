# Software-Tech-Test

One of DroneShield's missions is to provide the best Counterdrone defence in an emerging industry.
This challenge involves building a simulator for Counter UAS involving the detection of drones.

The provided code simulates two microservices that interface with each through redis publish and subscribe.
One microservice that publishes to redis the coordinates of the drone and another microservice that subscribes
to the event and pushes to a websocket (similar to the sample).

Currently, the frontend provides:

- A connection to the websocket with the received data logged to the console
- A map
- An icon of a drone on the map

In a functioning app, the drone icon will move on the map depending on the location provided in the websocket message.
Additionally, there should be a selectable simulated flying pattern of the drone such as "Figure 8", "Circle" or "Zigzag".
More advanced and intelligent flight paths will be given additional brownie points.
The flying pattern can be changed via HTTP request or direct command through websocket.

Task:
Review the provided frontend and backend code and write code to complete the implementation of the app. 
Additionally give comments on what would need to be done to make it production ready including testing.

## Instructions to run the sample

```
# Bring it up (Golang app)
docker compose up --build

# If using the TS app
cd drone_publisher_ts && npm run dev
cd drone_subscriber_ts && npm run dev

# Websocket endpoint, use your favourite WS client
ws://localhost:8080
```

### Frontend

```
cd drone_frontend
npm i
# make sure to have the backend running before next command
# simple UI here http://localhost:5173
npm run dev
```
