import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URI } from 'src/app/enums';

@Injectable({
    providedIn: 'root',
})
export class ProductosService {
    constructor(private _http: HttpClient) {}

    public obtenerProductos() {
        return this._http.get(URI.GET_PRODUCTOS);
    }
}
