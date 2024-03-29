import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs';

import { DriveFacadeService } from '@ngpk/drive/service';

@Component({
  selector: 'ngpk-drive',
  template: `
    <ngpk-action-buttons />
    <ngpk-file-list />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly driveFacadeService = inject(DriveFacadeService);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params: Params) => this.driveFacadeService.setParentId(params['id'] ?? '')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
