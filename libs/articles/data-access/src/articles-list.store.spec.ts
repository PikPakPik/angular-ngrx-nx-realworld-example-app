import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ArticlesListStore } from './articles-list.store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { API_URL } from '@realworld/core/http-client/src';

describe('ArticlesListStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ArticlesListStore,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });
  });

  it('should be created', inject([ArticlesListStore], (service: typeof ArticlesListStore) => {
    expect(service).toBeTruthy();
  }));
});
