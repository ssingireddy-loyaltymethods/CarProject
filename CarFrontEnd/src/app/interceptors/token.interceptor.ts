import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService : AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const getToken = this.authService.getToken();

    const modifiedReq = req.clone({ 

      headers: req.headers.set('authorization', `Bearer ${getToken}`),

    });

    return next.handle(modifiedReq);

  }

}
