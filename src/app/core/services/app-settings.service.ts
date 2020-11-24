import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { catchError, map, retry, share } from 'rxjs/operators';

import { AppSettingsModel } from '../models/app-settings';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private appSettings: AppSettingsModel;
  private appSettingsKey = 'app-settings';

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
    ) { }

  loadAppSettings(): void {
    this.appSettings = (this.localStorageService.getItem(this.appSettingsKey) as AppSettingsModel);

    if (!this.appSettings) {
      this.http.get<AppSettingsModel>('./assets/app-settings.json')
        .pipe(
          retry(2),
          catchError(this.handleError)
        ).subscribe((sets: AppSettingsModel) => {
          if (sets) {
            this.appSettings = sets;
            this.localStorageService.setItem(this.appSettingsKey, sets);
          } else {
            this.appSettings = new AppSettingsModel();
            this.appSettings.name = 'noname';
            this.appSettings.author = 'anonymous';
            this.appSettings.company = 'Epam Systems';
            this.appSettings.date = new Date();
          }
        });
    }
  }

  private handleError(err: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}
