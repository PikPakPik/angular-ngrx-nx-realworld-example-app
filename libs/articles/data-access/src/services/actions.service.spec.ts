import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ApiService, API_URL } from '@realworld/core/http-client';
import { ActionsService } from './actions.service';
import { withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

describe('ActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ActionsService,
        ApiService,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });
  });

  it('should be created', inject([ActionsService], (service: ActionsService) => {
    expect(service).toBeTruthy();
  }));
});
