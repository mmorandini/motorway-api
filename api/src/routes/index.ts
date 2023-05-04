import * as express from 'express';
import * as bodyParser from 'body-parser';
import VehiclesState from './vehicles-state';

class Routes {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Express middleware
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));
    }

    private routes(): void {
        this.express.use('/vehicle-state', VehiclesState);
    }
}

export default new Routes().express;
