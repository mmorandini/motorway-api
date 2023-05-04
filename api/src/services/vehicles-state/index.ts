import {Logger} from '../../utils/logger';
import {Database} from '../../utils/db';
import {PoolClient, QueryResult} from 'pg';
import {Vehicle} from '../../models/vehicle';

export class VehiclesStateService {

    private logger: Logger;
    private db: Database;

    constructor() {
        this.logger = new Logger();
        this.db = new Database();
    }

    async get(props: { vehicleId: number; timestamp: string }): Promise<QueryResult<Vehicle>> {
        let db: PoolClient;
        try {
            db = await this.db.connect();
        } catch (e) {
            this.logger.error(e);
            throw new Error('Database error');
        }
        const query = `
SELECT vehicles.*, "stateLogs".state
FROM vehicles
INNER JOIN (
  SELECT DISTINCT ON ("vehicleId") state, "vehicleId"
  FROM "stateLogs"
  WHERE timestamp <= $1
  AND "vehicleId" = $2
  ORDER BY "vehicleId", timestamp DESC
) "stateLogs" ON vehicles.id = "stateLogs"."vehicleId"
WHERE vehicles.id = $2;
            `;
        const values = [props.timestamp, props.vehicleId];
        return db.query(query, values)
            .catch((error) => {
                this.logger.error(error);
                throw new Error('Internal server error');
            });

    }
}
