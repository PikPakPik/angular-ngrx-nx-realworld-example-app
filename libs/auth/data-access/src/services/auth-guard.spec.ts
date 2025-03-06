import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth-guard';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '@realworld/core/http-client/src';
import { of } from 'rxjs';
import { AuthStore } from '../auth.store';

@Component({
  selector: 'cdt-test-comp',
  template: '',
})
class TestComponent {}

describe('authGuard', () => {
  let storage: LocalStorageJwtService;
  let router: Router;
  let mockAuthStore: { loggedIn: jest.Mock };

  beforeEach(() => {
    mockAuthStore = {
      loggedIn: jest.fn().mockReturnValue(true),
    };

    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'login',
            component: TestComponent,
          },
        ]),
      ],
      providers: [
        { provide: LocalStorageJwtService, useValue: { getItem: () => of('token') } },
        { provide: API_URL, useValue: 'https://api.example.com' },
        { provide: AuthStore, useValue: mockAuthStore },
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
      ],
    });

    storage = TestBed.inject(LocalStorageJwtService);
    router = TestBed.inject(Router);
  });

  it('should return true if the user is logged in', () => {
    const result = TestBed.runInInjectionContext(() => authGuard());

    expect(result).toBe(true);
  });

  it('should return login urlTree if the user is not logged in', () => {
    mockAuthStore.loggedIn.mockReturnValueOnce(false);

    const result = TestBed.runInInjectionContext(() => authGuard());
    const expectedUrlTree = router.parseUrl('/login');

    expect(result).toEqual(expectedUrlTree);
  });
});
