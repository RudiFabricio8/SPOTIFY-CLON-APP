import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
const token = environment.spotifyAccessToken;
if (token && req.url.startsWith(environment.spotifyApiUrl)) {
const authReq = req.clone({
setHeaders: {
Authorization: `Bearer ${token}`
}
});
return next.handle(authReq);
}
return next.handle(req);
}
}
