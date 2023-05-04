import {VehiclesStateService} from '../../services/vehicles-state';
import {Logger} from '../../utils/logger';
import {Vehicle} from '../../models/vehicle';

export class VehiclesStateController {

    private vehicleStateService: VehiclesStateService;
    private logger: Logger;

    constructor(service: VehiclesStateService, logger: Logger) {
        this.vehicleStateService = service
        this.logger = logger
    }

    // Fetch resource via vehiclesStateService
    async fetch(props: {vehicleId: number, timestamp: string}): Promise<Vehicle[]> {
        this.logger.info(`Fetch vehicle state: ${JSON.stringify(props)}`);
        const { rows } = await this.vehicleStateService.get(props);
        return rows;
    }
}
