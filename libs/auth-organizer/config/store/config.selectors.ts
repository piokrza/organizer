import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppConfig, ThemeType } from '@ngpk/auth-organizer/config/models';
import { State as ConfigState, FeatureKey } from '@ngpk/auth-organizer/config/store';
import { Category, CategoryType } from '@ngpk/cash-flow/model';

const ConfigStateSelector = createFeatureSelector<ConfigState>(FeatureKey);

export const isLoading = createSelector(ConfigStateSelector, ({ isLoading }: ConfigState): boolean => isLoading);
export const config = createSelector(ConfigStateSelector, ({ config }: ConfigState): AppConfig | null => config);
export const cashFlowCategories = (type?: CategoryType) => {
  return createSelector(ConfigStateSelector, ({ config }): Category[] => {
    return type ? config?.cashFlowCategories.filter((cat) => cat.type === type) ?? [] : config?.cashFlowCategories ?? [];
  });
};
export const currency = createSelector(ConfigStateSelector, ({ config }: ConfigState): string => config?.currency ?? '');
export const theme = createSelector(ConfigStateSelector, ({ config }: ConfigState): ThemeType => config?.theme ?? 'dark');
