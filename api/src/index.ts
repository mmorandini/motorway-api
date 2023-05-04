import App from './app';
import * as http from 'http';
import {Logger} from './utils/logger';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || '3070';
const logger: Logger = new Logger();

// Init server
App.set('port', port);
const server = http.createServer(App);
server.listen(port);

server.on('listening', function (): void {
    const addr = server.address();
    if (addr) {
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        logger.info(`Listening on ${bind}`);
    }
})

module.exports = App;
