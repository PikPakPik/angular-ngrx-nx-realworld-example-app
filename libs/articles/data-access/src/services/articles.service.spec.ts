import { ApiService, API_URL } from '@realworld/core/http-client';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ArticlesService,
        ApiService,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });
  });

  it('should be created', inject([ArticlesService], (service: ArticlesService) => {
    expect(service).toBeTruthy();
  }));
});
