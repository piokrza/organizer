import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/compat';
import { PrimeNGConfig } from 'primeng/api';
import { filter, Observable, tap } from 'rxjs';

import { AuthApiService } from '@ngpk/auth-organizer/api';
import { ConfigActions } from '@ngpk/auth-organizer/config/store';
import { AuthActions } from '@ngpk/auth-organizer/state';
import { CashFlowActions } from '@ngpk/cash-flow/state';
import { ThemeService } from '@ngpk/core/service';
import { DriveActions } from '@ngpk/drive/state';
import { TaskerActions } from '@ngpk/tasker/state';

@Component({
  selector: 'org-root',
  template: `
    <ngpk-organizer-layout>
      <router-outlet />
    </ngpk-organizer-layout>
  `,
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly themeService = inject(ThemeService);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly translateService = inject(TranslateService);
  private readonly authApiService = inject(AuthApiService);

  ngOnInit(): void {
    this.setPrimeNgConfig();
    this.loadUserData$().subscribe();
    this.themeService.applyTheme$().subscribe();
  }

  private loadUserData$(): Observable<firebase.User> {
    return this.authApiService.authState$.pipe(
      filter(Boolean),
      tap(({ uid }) => {
        this.store.dispatch(DriveActions.loadFiles({ uid }));
        this.store.dispatch(AuthActions.loadUserData({ uid }));
        this.store.dispatch(ConfigActions.loadConfig({ uid }));
        this.store.dispatch(TaskerActions.loadBoards({ uid }));
        this.store.dispatch(CashFlowActions.loadCashFlow({ uid }));
      })
    );
  }

  private setPrimeNgConfig(): void {
    this.primengConfig.ripple = true;
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
