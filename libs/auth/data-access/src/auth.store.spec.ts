import { API_URL, ApiService } from '@realworld/core/http-client';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { AuthStore } from './auth.store';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptorsFromDi } from '@angular/common/http';

describe('AuthStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthStore,
        ApiService,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });
  });

  it('should be created', inject([AuthStore], (service: typeof AuthStore) => {
    expect(service).toBeTruthy();
  }));
});
