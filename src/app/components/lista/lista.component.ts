import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DISPLAYED_COLUMNS_PRODUCTOS } from 'src/app/constants';
import { IResProducto } from 'src/app/interfaces';
import { ProductosService } from 'src/app/services/http/productos.service';
import * as constants from '../../constants';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss'],
})
export class ListaComponent {
    public filterForm!: FormGroup;
    public displayedCols: string[] = DISPLAYED_COLUMNS_PRODUCTOS;
    public dataLista!: MatTableDataSource<IResProducto>;
    public constants: typeof constants = constants;

    constructor(
        private fb: FormBuilder,
        private productoHttpService: ProductosService
    ) {
        this.initialForm();
    }

    private initialForm(): void {
        this.filterForm = this.fb.group({
            codigo: [''],
            nombre: [''],
        });
    }

    public obtenerData(): void {
        this.productoHttpService
            .obtenerProductos()
            .subscribe((res: IResProducto[]) => {
                this.inicializarTabla(res);
            });
    }

    private inicializarTabla(data): void {
        this.dataLista = new MatTableDataSource(data);
    }

    public buscar(): void {
        const codigo = this.filterForm.controls['codigo'].value;
        const nombre = this.filterForm.controls['nombre'].value;

        const originalData = this.dataLista.data;

        const filteredData = originalData.filter((producto: IResProducto) => {
            const codigoMatch = codigo
                ? producto.COD.toLowerCase().includes(
                      codigo.toLowerCase().trim()
                  )
                : true;
            const nombreMatch = nombre
                ? producto.NOMBRE.toLowerCase().includes(nombre.toLowerCase())
                : true;

            return codigoMatch && nombreMatch;
        });

        this.dataLista.data = filteredData;
    }
}
