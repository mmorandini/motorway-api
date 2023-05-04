import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {Logger} from './utils/logger';
import Routes from './routes';

const corsHandler = cors({origin: true});

class App {

    public express: express.Application;
    private logger: Logger;

    constructor() {
        this.express = express();
        this.logger = new Logger();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(corsHandler);
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));
    }

    private routes(): void {
        this.express.get('/', (req, res) => {
            res.send('App works!');
        });

        // Api routes
        this.express.use('/api', Routes);

        // Handle undefined routes
        this.express.use('*', (req, res) => {
            this.logger.info(req.path);
            res.status(404).send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;



