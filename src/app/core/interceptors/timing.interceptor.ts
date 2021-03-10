import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  private time: number;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      this.time = Date.now();
    }

    return next.handle(req).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((event: HttpResponse<any>) => {
        if (req.method === 'GET') {
          const result = Date.now() - this.time;
          console.log(result / 1000);
        }
        return event;
      })
    );
  }
}
