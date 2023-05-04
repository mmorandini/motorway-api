import {expect} from 'chai';
import * as sinon from 'sinon';
import {SinonStubbedInstance} from 'sinon';
import {VehiclesStateService} from '../../services/vehicles-state';
import {Logger} from '../../utils/logger';
import {Vehicle} from '../../models/vehicle';
import {VehiclesStateController} from './index';
import {VehicleState} from '../../enums';

describe('VehiclesStateController', () => {
    let vehiclesStateController: VehiclesStateController;
    let vehiclesStateServiceStub: SinonStubbedInstance<VehiclesStateService>;
    let loggerStub: SinonStubbedInstance<Logger>;

    beforeEach(() => {
        vehiclesStateServiceStub = sinon.createStubInstance(VehiclesStateService);
        loggerStub = sinon.createStubInstance(Logger);
        vehiclesStateController = new VehiclesStateController(vehiclesStateServiceStub, loggerStub);
    });

    describe('fetch', () => {
        it('should fetch vehicle state from service', async () => {
            const props = { vehicleId: 1, timestamp: '2022-06-01T00:00:00.000Z' };
            const rows: Vehicle[] = [
                { id: 1, make: 'Ford', model: 'Fiesta', state: VehicleState.Quoted },
                { id: 1, make: 'Ford', model: 'Impala', state: VehicleState.Selling },
            ];
            vehiclesStateServiceStub.get.resolves({command: '', fields: [], oid: 0, rowCount: 0, rows });
            const result = await vehiclesStateController.fetch(props);
            expect(result).to.deep.equal(rows);
            expect(vehiclesStateServiceStub.get.calledOnceWith(props)).to.be.true;
            expect(loggerStub.info.calledOnceWith(`Fetch vehicle state: ${JSON.stringify(props)}`)).to.be.true;
        });
    });
});
