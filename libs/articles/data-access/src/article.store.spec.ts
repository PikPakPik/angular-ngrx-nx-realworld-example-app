import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ArticleStore } from './article.store';
import { withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { API_URL } from '@realworld/core/http-client/src';

describe('ArticleStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ArticleStore,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });
  });

  it('should be created', inject([ArticleStore], (service: typeof ArticleStore) => {
    expect(service).toBeTruthy();
  }));
});
