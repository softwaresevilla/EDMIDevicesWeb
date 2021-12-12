import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DeviceService, AlertService } from '@app/_services';
import { Device } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    devices!: Device[];

    constructor(private deviceService: DeviceService, private alertService: AlertService) {}

    ngOnInit() {
        this.listDevices();
    }

    listDevices() {
        this.deviceService.getAll()
            .pipe(first())
            .subscribe((devices: Device[]) => this.devices = devices);
    }

    deleteDevice(id: string) {
        const device = this.devices.find(x => x.id === id);
        if (!device) return;
        device.isDeleting = true;
        this.deviceService.delete(id)
            .subscribe(() => {
                this.alertService.success('Device deleted', { keepAfterRouteChange: true });
                this.listDevices();
            });
    }
}