import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  public static handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error(`Hubo un error: ${error.error.message}`);
    } else {
      console.error(`Hubo un error: ${error.message}`);
    }
    return throwError(() => new Error(error.error));
  }
}
