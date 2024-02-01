import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, type FormGroup, Validators } from '@angular/forms';
import { MSG_ERROR_FORMATO } from 'src/app/constants';
import { EnumTypeFile } from 'src/app/enums';
import { ArchivosService } from 'src/app/services/helpers/archivos.service';

@Component({
    selector: 'app-archivo',
    templateUrl: './archivo.component.html',
    styleUrls: ['./archivo.component.scss'],
})
export class ArchivoComponent {
    @Output() isValidArchivo = new EventEmitter<boolean>();

    public archiveForm: FormGroup;
    private fileTmp!: File;

    constructor(
        private fb: FormBuilder,
        private readonly archivoHelpService: ArchivosService
    ) {
        this.archiveForm = this.fb.group({
            archivo: ['', Validators.required],
        });
    }

    public detectarArchivo(fileEvent): void {
        this.fileTmp = fileEvent.files[0];
        const extension = this.archivoHelpService.obtenerExtension(
            this.fileTmp
        );

        if (extension === EnumTypeFile.EXCEL) {
            this.emitirValidArchivo(true);
            return;
        }

        window.alert(MSG_ERROR_FORMATO);
        this.emitirValidArchivo(false);
    }

    public emitirValidArchivo(valid: boolean): void {
        this.isValidArchivo.emit(valid);
    }

    public transFilePadre(): FormData {
        const formData = new FormData();
        formData.append('file', this.fileTmp);
        return formData;
    }
}
