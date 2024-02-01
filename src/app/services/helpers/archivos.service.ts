import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ArchivosService {
    constructor() {}

    public obtenerExtension(file: File): string {
        const extension = file.name.split('.')[1];
        return extension;
    }
}
