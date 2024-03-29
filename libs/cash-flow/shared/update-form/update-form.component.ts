import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { ConfigSelectors } from '@ngpk/auth-organizer/config/store';
import { CashFlow, CashFlowForm, Category } from '@ngpk/cash-flow/model';
import { CashFlowService } from '@ngpk/cash-flow/service';

@Component({
  selector: 'ngpk-update-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly cashFlowService = inject(CashFlowService);

  readonly trPath: string = 'cashFlow.form.';
  readonly cashFlow: CashFlow = inject(DynamicDialogConfig).data;
  readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;

  readonly categories$: Observable<Category[]> = this.store.select(ConfigSelectors.cashFlowCategories(this.cashFlow.type));

  ngOnInit(): void {
    setTimeout(() => {
      this.form.patchValue({
        name: this.cashFlow.name,
        amount: this.cashFlow.amount,
        categoryId: this.cashFlow.categoryId,
        description: this.cashFlow.description,
        date: this.cashFlow.date.toDate(),
      });
    }, 50);
  }

  onSubmit(): void {
    const id: string = this.cashFlow.id;
    const date: Timestamp = Timestamp.fromDate(this.form.getRawValue().date!);

    this.dialogRef.close({ ...this.cashFlow, ...this.form.getRawValue(), date, id } satisfies CashFlow);
  }

  get controls(): CashFlowForm {
    return this.form.controls;
  }
}
