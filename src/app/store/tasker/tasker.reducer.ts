import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { Task } from '#features/tasker/models';
import { AuthActions } from '#store/auth';
import { TaskerActions } from '#store/tasker';

export const FeatureKey = 'tasker';

export interface State {
  tasks: Task[];
  isLoading: boolean;
}

const initialState: State = {
  tasks: [],
  isLoading: false,
};

export const Reducer: ActionReducer<State, Action> = createReducer(
  initialState,

  on(TaskerActions.getTasksUserData, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(TaskerActions.getTasksUserDataSuccess, (_: State, { tasks }): State => {
    return { tasks, isLoading: false };
  }),
  on(TaskerActions.getTasksUserDataError, (state): State => {
    return { ...state, isLoading: false };
  }),

  // on signout
  on(AuthActions.signOut, (): State => {
    return { isLoading: false, tasks: [] };
  })
);