import { TestBed } from '@angular/core/testing';
import { profileFavoritesResolver } from './profile-favorites-resolver';
import { cold } from 'jasmine-marbles';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArticlesListStore, articlesListInitialState } from '@realworld/articles/data-access';
import { withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '@realworld/core/http-client/src';
import { provideHttpClient } from '@angular/common/http';

const mockRoute: ActivatedRouteSnapshot = {
  parent: { params: { username: 'stef' } },
} as unknown as ActivatedRouteSnapshot;

describe('profileFavoritesResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticlesListStore,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: API_URL, useValue: 'https://api.example.com' },
      ],
    });
  });

  it('should return `true` and dispatch articleListActions.setListConfig action', () => {
    const articlesListStore = TestBed.inject(ArticlesListStore);
    const dispatchSpy = jest.spyOn(articlesListStore, 'setListConfig');

    const result = TestBed.runInInjectionContext(
      () => profileFavoritesResolver(mockRoute, {} as RouterStateSnapshot) as any,
    );

    expect(dispatchSpy).toHaveBeenCalledWith({
      ...articlesListInitialState.listConfig,
      filters: {
        ...articlesListInitialState.listConfig.filters,
        favorited: 'stef',
      },
    });

    expect(result).toBeObservable(cold('(a|)', { a: true }));
  });
});
