import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, share } from 'rxjs/operators';
import { AppSettingsModel } from 'src/app/interface/products';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  setAppSetting(settings: AppSettingsModel): void {
    if (!settings) {
      settings = { appConfig: false };
    }
    this.localStorageService.setItemLocalStorage('settings', settings);
  }

  getAppSetting(): Observable<AppSettingsModel> {
    const appConfig: AppSettingsModel = this.localStorageService.getItemLocalStorage('settings');
    if (appConfig) {
      return of(appConfig);
    }
    return this.http.get<AppSettingsModel>('../../../assets/app-settings.json').pipe(
      retry(2),
      share(),
      catchError(() => {
        console.error('error');
        return of(null);
      })
    );
  }
}
