import { Component, ViewChild } from '@angular/core';
import * as constants from './constants';
import { ArchivoComponent } from './components/archivo/archivo.component';
import { ArchivosService } from './services/http/archivos.service';
import { ListaComponent } from './components/lista/lista.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(ArchivoComponent)
    ArchivoComponent: ArchivoComponent;

    @ViewChild(ListaComponent)
    ListaComponent: ListaComponent;

    public isArchive: boolean = false;
    public isValidArchivo: boolean = false;
    public constants: typeof constants = constants;

    constructor(private readonly archivoService: ArchivosService) {}

    public analizar(): void {
        const fileTmp = this.ArchivoComponent.transFilePadre();

        this.archivoService.enviarGuardarArchivo(fileTmp).subscribe(() => {
            this.isArchive = !this.isArchive;
            this.isValidArchivo = false;
            this.ListaComponent.obtenerData();
        });
    }

    public reiniciar(): void {
        this.isArchive = !this.isArchive;
    }

    public validArchivo(event: boolean): void {
        this.isValidArchivo = event;
    }
}
