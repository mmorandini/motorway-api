import * as chai from 'chai';
import { expect } from 'chai';
import { SinonSpy } from 'sinon';
import * as sinon from 'sinon';
import { Logger } from './index';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('Logger', () => {
    let logger: Logger;
    let logSpy: SinonSpy;

    beforeEach(() => {
        logger = new Logger();
        logSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('info', () => {
        it('should log an info message with the current date', () => {
            const message = 'Some info message';
            logger.info(message);

            expect(logSpy).to.have.been.calledWithMatch(
                new RegExp(`^.* info >>> ${message}$`)
            );
        });
    });

    describe('debug', () => {
        it('should log a debug message with the current date', () => {
            const message = 'Some debug message';
            logger.debug(message);

            expect(logSpy).to.have.been.calledWithMatch(
                new RegExp(`^.* debug >>> ${message}$`)
            );
        });
    });

    describe('error', () => {
        it('should log an error message with the current date', () => {
            const message = 'Some error message';
            logger.error(message);

            expect(logSpy).to.have.been.calledWithMatch(
                new RegExp(`^.* error >>> ${message}$`)
            );
        });
    });
});





// import * as chai from 'chai';
// import { expect } from 'chai';
// import * as sinonChai from 'sinon-chai'
// import * as sinon from 'sinon';
// import { Logger } from './index';
//
// chai.use(sinonChai);
//
// describe('Logger', () => {
//     let sandbox: sinon.SinonSandbox;
//     let logger: Logger;
//     let consoleStub: sinon.SinonStub;
//
//     beforeEach(() => {
//         sandbox = sinon.createSandbox();
//         logger = new Logger();
//         consoleStub = sandbox.stub(console, 'log');
//     });
//
//     afterEach(() => {
//         sandbox.restore();
//     });
//
//     describe('info', () => {
//         it('should log an info message with the current date', () => {
//             const message = 'Some message';
//             logger.info(message);
//             expect(consoleStub).to.have.been.calledWithMatch(sinon.match(/^.* info >>>/), message);
//         });
//     });
//
//     describe('debug', () => {
//         it('should log a debug message with the current date', () => {
//             const message = 'Some warning';
//             logger.debug(message);
//             expect(consoleStub).to.have.been.calledWithMatch(sinon.match(/^.* debug >>>/), message);
//         });
//     });
//
//     describe('error', () => {
//         it('should log an error message with the current date', () => {
//             const message = 'Some error message';
//             logger.error(message);
//             expect(consoleStub).to.have.been.calledWithMatch(sinon.match(/^.* error >>>/), message);
//         });
//     });
// });
