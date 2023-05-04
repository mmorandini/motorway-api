import {VehicleState} from '../../enums';

export interface Vehicle {
    id: number;
    make: string;
    model: string;
    state: VehicleState
}
