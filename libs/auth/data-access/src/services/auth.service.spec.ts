import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { API_URL, ApiService } from '@realworld/core/http-client';

import { AuthService } from './auth.service';
import { withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        ApiService,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
