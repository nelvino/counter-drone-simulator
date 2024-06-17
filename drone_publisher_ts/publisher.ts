// @ts-ignore
import Redis from 'ioredis';
import { random } from 'lodash';

type Location = {
  latitude: number;
  longitude: number;
};

class DroneSimulator {
  private redisClient: Redis.Redis;
  private readonly channelName: string = 'drone_coordinates';

  constructor(redisUrl: string) {
    this.redisClient = new Redis(redisUrl);
  }

  public startPublishing() {
    setInterval(async () => {
      const coordinates = this.simulateDroneCoordinates();
      const coordinatesJson = JSON.stringify(coordinates);

      try {
        await this.redisClient.publish(this.channelName, coordinatesJson);
      } catch (err) {
        console.error('Error publishing drone coordinates:', err);
      }
    }, 1000);
  }

  private simulateDroneCoordinates(): Location {
    const baseLocation: Location = { latitude: -33.947346, longitude: 151.179428 };

    // Simulate small random changes in the drone's location
    const location: Location = {
      latitude: baseLocation.latitude + random(-0.001, 0.001, true),
      longitude: baseLocation.longitude + random(-0.001, 0.001, true),
    };

    return location;
  }
}

const droneSimulator = new DroneSimulator('redis://localhost:6379');
droneSimulator.startPublishing();