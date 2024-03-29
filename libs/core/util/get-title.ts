import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Environment } from 'apps/organizer/src/environments';

export const getTitle = (title: keyof Environment['featureFlags']) => {
  return () => inject(TranslateService).instant(`menu.${title}`);
};
