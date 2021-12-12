import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DeviceService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { Device } from '@app/_models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    deviceType!: string;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private deviceService: DeviceService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        passwordValidators.push(Validators.required);

        this.form = this.formBuilder.group({
            id: [''],
            serialNumber: ['', Validators.required],
            firmwareVersion: ['', Validators.required],
            deviceType: ['', Validators.required],
            state: [''],
            ip: [''],
            port: ['']
        });

        if (!this.isAddMode) {
            this.deviceService.getById(this.id)
                .pipe(first())
                .subscribe((x: { [x: string]: any; deviceType?: any; }) => {
                    this.form.patchValue(x);
                    this.deviceType = x.deviceType
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createDevice();
        } else {
            this.updateDevice();
        }
    }

    changeDeviceType(deviceType: string) {
        this.deviceType = deviceType;
    }

    private createDevice() {
        const formCopy = Object.assign({}, this.form.value);
        if (this.deviceType != 'Gateway') {
            delete formCopy.ip;
            delete formCopy.port;
        }
        this.deviceService.create(formCopy)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Device added', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    private updateDevice() {
        this.form.value['id'] = this.id;
        this.deviceService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('Device updated', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }
}