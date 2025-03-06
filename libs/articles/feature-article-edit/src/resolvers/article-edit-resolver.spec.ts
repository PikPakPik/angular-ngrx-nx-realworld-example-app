import { TestBed } from '@angular/core/testing';
import { articleEditResolver } from './article-edit-resolver';
import { cold } from 'jasmine-marbles';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArticleStore } from '@realworld/articles/data-access';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptorsFromDi } from '@angular/common/http';
import { API_URL } from '@realworld/core/http-client';
const mockRoute: ActivatedRouteSnapshot = { params: { slug: '1' } } as unknown as ActivatedRouteSnapshot;

describe('articleEditResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleStore,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });
  });

  it('should just return `true` when slug is undefined', () => {
    const result = TestBed.runInInjectionContext(
      () => articleEditResolver(mockRoute, {} as RouterStateSnapshot) as any,
    );
    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });
});
