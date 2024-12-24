import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerState, errorHandlerInitialState } from './models/error-handler.state';
import { HttpErrorResponse } from '@angular/common/http';

export const ErrorHandlerStore = signalStore(
  { providedIn: 'root' },
  withState<ErrorHandlerState>(errorHandlerInitialState),
  withProps(() => ({
    _router: inject(Router),
  })),
  withMethods((store) => ({
    handleError401: (error: HttpErrorResponse) => {
      patchState(store, {
        code: error.status,
        message: error.message,
      });
      store._router.navigate(['/login']);
    },
    handleError404: (error: HttpErrorResponse) => {
      patchState(store, {
        code: error.status,
        message: error.message,
      });
      store._router.navigate(['/']);
    },
  })),
);
