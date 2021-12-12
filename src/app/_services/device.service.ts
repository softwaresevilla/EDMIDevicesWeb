import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Device } from '@app/_models';

const baseUrl = `${environment.apiUrl}/device`;

@Injectable({ providedIn: 'root' })
export class DeviceService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Device[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Device>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`, {responseType: 'text'});
    }
}