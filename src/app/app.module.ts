import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './components/lista/lista.component';
import { ArchivoComponent } from './components/archivo/archivo.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoInterceptorProviders } from './interceptors/productos.interceptor';
import { ArchivosService } from './services/http/archivos.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ClassBadgePipeModule } from './pipes';

@NgModule({
    declarations: [AppComponent, ListaComponent, ArchivoComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        BrowserAnimationsModule,
        MatTableModule,
        MatInputModule,
        ClassBadgePipeModule,
    ],
    providers: [ProductoInterceptorProviders, ArchivosService, FormBuilder],
    bootstrap: [AppComponent],
})
export class AppModule {}
