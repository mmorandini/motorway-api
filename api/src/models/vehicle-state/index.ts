import {VehicleState as VehicleStateEnum} from '../../enums';

export interface VehicleState {
    vehicleId: number;
    state: VehicleStateEnum;
    timestamp: string;
}
