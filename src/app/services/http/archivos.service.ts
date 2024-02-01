import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URI } from 'src/app/enums';

@Injectable({
    providedIn: 'root',
})
export class ArchivosService {
    constructor(private _http: HttpClient) {}

    public enviarGuardarArchivo(file: FormData) {
        return this._http.post(URI.UPLOAD_EXCEL, file);
    }
}
