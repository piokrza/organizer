import { createReducer, on } from '@ngrx/store';

import { AppConfig } from '@ngpk/auth-organizer/config/models';
import { ConfigActions } from '@ngpk/auth-organizer/config/store';
import { AuthActions } from '@ngpk/auth-organizer/state';

export const FeatureKey = 'config';

export interface State {
  isLoading: boolean;
  config: AppConfig | null;
}

const initialState: State = {
  isLoading: false,
  config: null,
};

export const Reducer = createReducer(
  initialState,

  on(ConfigActions.loadConfig, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(ConfigActions.loadConfigSuccess, (_, { config }): State => {
    return { config, isLoading: false };
  }),
  on(ConfigActions.loadConfigFailure, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(AuthActions.signOut, (): State => {
    return { config: null, isLoading: false };
  })
);
