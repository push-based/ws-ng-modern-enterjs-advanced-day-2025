import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ReadAccessInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const key = environment.tmdbApiReadAccessKey;

    return next.handle(
      req.clone({
        headers: new HttpHeaders().set('Authorization', `Bearer ${key}`),
      }),
    );
  }
}
