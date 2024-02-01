import { Injectable } from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ProductoInterceptor implements HttpInterceptor {
    private readonly url: string = `${environment.envVar.BACKEND_URL}`;
    private request: any;

    constructor(private _loader: NgxSpinnerService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this._loader.show();

        const url = `${this.url}${req.url}`;

        this.request = req.clone({
            url: url,
            setHeaders: {
                'Cache-control': 'no-cache',
            },
        });

        return next.handle(this.request).pipe(
            catchError((error: HttpErrorResponse) => {
                this._loader.show();
                return throwError(() => error);
            }),
            finalize(() => this._loader.hide())
        );
    }
}

export const ProductoInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ProductoInterceptor,
        multi: true,
    },
];
