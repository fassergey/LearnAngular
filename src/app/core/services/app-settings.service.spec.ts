import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { AppSettingsModel } from '../models/app-settings';
import { AppSettingsService } from './app-settings.service';
import { LocalStorageService } from './local-storage.service';

describe('AppSettingsService', () => {
  let appSettingsService: AppSettingsService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let httpClientServiceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['setItem', 'getItem', 'removeItem']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [AppSettingsService,
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });

    appSettingsService = TestBed.inject(AppSettingsService);
    localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    httpClientServiceSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('loadAppSettings should call LocalStorage.getItem once', () => {
    const expectedSettings: AppSettingsModel = {
      author: 'author',
      company: 'company',
      date: new Date(),
      name: 'name',
      version: '1.0.0'
    };
    httpClientServiceSpy.get.and.returnValue(of(expectedSettings));

    appSettingsService.loadAppSettings();
    expect(localStorageServiceSpy.getItem.calls.count()).toBe(1);
  });

  it('loadAppSettings should call HttpClient.get once', () => {
    const expectedSettings: AppSettingsModel = {
      author: 'author',
      company: 'company',
      date: new Date(),
      name: 'name',
      version: '1.0.0'
    };
    httpClientServiceSpy.get.and.returnValue(of(expectedSettings));

    appSettingsService.loadAppSettings();
    expect(httpClientServiceSpy.get.calls.count()).toBe(1);
  });

  it('loadAppSettings should not call HttpClient.get', () => {
    const expectedSettings: AppSettingsModel = {
      author: 'author',
      company: 'company',
      date: new Date(),
      name: 'name',
      version: '1.0.0'
    };
    localStorageServiceSpy.getItem.and.returnValue(expectedSettings);

    appSettingsService.loadAppSettings();
    expect(httpClientServiceSpy.get.calls.count()).toBe(0);
  });
});
