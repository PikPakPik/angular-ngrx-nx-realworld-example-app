import { TestBed } from '@angular/core/testing';
import { profileArticlesResolver } from './profile-articles-resolver';
import { cold } from 'jasmine-marbles';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArticlesListStore, articlesListInitialState } from '@realworld/articles/data-access';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { withInterceptorsFromDi } from '@angular/common/http';
import { API_URL } from '@realworld/core/http-client/src';

const mockRoute: ActivatedRouteSnapshot = { params: { username: 'stef' } } as unknown as ActivatedRouteSnapshot;

describe('profileArticlesResolver', () => {
  let articlesListStore: InstanceType<typeof ArticlesListStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticlesListStore,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });

    articlesListStore = TestBed.inject(ArticlesListStore);
  });

  it('should return `true` and dispatch actions on the store', () => {
    const setListConfigSpy = jest.spyOn(articlesListStore, 'setListConfig');
    const loadArticlesSpy = jest.spyOn(articlesListStore, 'loadArticles');

    const result = TestBed.runInInjectionContext(
      () => profileArticlesResolver(mockRoute, {} as RouterStateSnapshot) as any,
    );

    expect(setListConfigSpy).toHaveBeenCalledWith({
      ...articlesListInitialState.listConfig,
      filters: {
        ...articlesListInitialState.listConfig.filters,
        author: 'stef',
      },
    });

    expect(loadArticlesSpy).toHaveBeenCalledWith({
      ...articlesListInitialState.listConfig,
      filters: {
        ...articlesListInitialState.listConfig.filters,
        author: 'stef',
      },
    });

    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });
});
