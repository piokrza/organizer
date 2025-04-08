import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { UserInfo } from '#auth/model';

interface UserState {
  isProcessing: boolean;
  user: UserInfo | null | undefined;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({
    user: null,
    isProcessing: false,
  } as UserState),
  withMethods((store) => ({
    setUser(user: UserInfo | null) {
      patchState(store, () => ({ user }));
    },
    setIsProcessing(isProcessing: boolean) {
      patchState(store, () => ({ isProcessing }));
    },
  }))
);
