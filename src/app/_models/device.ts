import { DeviceType } from './devicetype';

export class Device {
    id!: string;
    serialNumber!: string;
    firmwareVersion!: string;
    deviceType!: DeviceType;
    state!: string;
    ip!: string;
    port!: number;
    isDeleting!: boolean;
}