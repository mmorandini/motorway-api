import * as express from 'express';
import {VehiclesStateController} from '../../controllers/vehicles-state';
import {Logger} from '../../utils/logger';
import {Redis} from '../../utils/redis';
import {VehiclesStateService} from '../../services/vehicles-state';

const app = express();
const logger: Logger = new Logger();
const service: VehiclesStateService = new VehiclesStateService();
const vehiclesStateController: VehiclesStateController = new VehiclesStateController(service, logger);
const redis: Redis = new Redis(60);

// Get vehicle state by id and timestamp
app.get('/:vehicleId/:timestamp', async (req, res) => {
    const {vehicleId, timestamp} = req.params;
    const parsedTimestamp = Date.parse(timestamp);
    const vehicleIdAsNumber = Number(vehicleId);

    // Check that timestamp is valid
    if (isNaN(parsedTimestamp)) {
        return res.status(400).json({ error: 'Invalid timestamp' });
    }

    // Check that vehicle id is a valid number
    if (isNaN(vehicleIdAsNumber)) {
        return res.status(400).json({ error: 'Invalid id' });
    }


    try {
        // fetch resource via caching service
        const payload = await redis.get(
            req.originalUrl || req.url,
            () => vehiclesStateController.fetch({vehicleId: vehicleIdAsNumber, timestamp})
        );

        if (payload.length === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        return res.json(payload[0]);
    } catch (e) {
        logger.error(e);
        res.status(500).send('Internal Server Error');
    }
})

export default app;

