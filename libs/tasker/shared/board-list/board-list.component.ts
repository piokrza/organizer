import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import { connectState } from '@ngpk/core/util';
import { ContainerComponent, AddItemBtnComponent } from '@ngpk/shared-ui/shared';
import { BoardsFacadeService } from '@ngpk/tasker/service';

const imports = [ContainerComponent, TranslateModule, AddItemBtnComponent, TooltipModule];

@Component({
  selector: 'ngpk-board-list',
  templateUrl: './board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class BoardListComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly boardsFacadeService = inject(BoardsFacadeService);

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly state = connectState(this.destroyRef, this.boardsFacadeService.boardListState);

  navigateToDetails(id: string): void {
    this.boardsFacadeService.navigateToDetails(id);
  }

  addBoard(boardName: string): void {
    this.boardsFacadeService.addBoard(boardName, this.state.userId);
  }
}
