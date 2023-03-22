import { CashFlow } from '@common/models/cash-flow.model';
import { createReducer, on } from '@ngrx/store';
import { CashFlowActions } from '@store/cash-flow';

export const FeatureKey = 'incomes';

export interface State {
  incomes: CashFlow[];
  expenses: CashFlow[];
  isLoading: boolean;
}

const initialState: State = {
  incomes: [],
  expenses: [],
  isLoading: false,
};

export const Reducer = createReducer(
  initialState,

  // get incomes
  on(CashFlowActions.getIncomes, (state): State => {
    return { ...state, isLoading: true };
  }),
  on(CashFlowActions.getIncomesSuccess, (state, { incomes }): State => {
    return { ...state, incomes, isLoading: false };
  }),
  on(CashFlowActions.getIncomesFailure, (state: State): State => {
    return { ...state, isLoading: false };
  }),

  // add income
  on(CashFlowActions.addIncome, (state, { income }): State => {
    return { ...state, incomes: [...state.incomes, income] };
  }),

  // get expenses
  on(CashFlowActions.getExpenses, (state): State => {
    return { ...state, isLoading: false };
  }),
  on(CashFlowActions.getExpensesSuccess, (state, { expenses }): State => {
    return { ...state, expenses, isLoading: false };
  }),
  on(CashFlowActions.getExpensesFailure, (state): State => {
    return { ...state, isLoading: false };
  })
);