import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ChartData } from 'chart.js';
import { Observable, combineLatest, map, tap } from 'rxjs';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { OverviewStateModel } from '#app/features/cash-flow/models/overview-state.model';
import { CashFlow, Category, ChartColor } from '#cash-flow/models';
import { CashFlowSelectors } from '#cash-flow/store';
import { ConfigSelectors } from '#core/config/store';
import { baseDialogStyles } from '#core/constants';
import { AppPaths } from '#core/enums';
import { LabeledData, ObservableDictionary } from '#core/models';
import { getRandomNumber } from '#core/utils';
import { NoteFormComponent } from '#tasker/components';
import { Note } from '#tasker/models';
import { TaskerService } from '#tasker/services';
import { TaskerActions } from '#tasker/store';

@Injectable()
export class OverviewService {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly taskerService = inject(TaskerService);
  private readonly dialogService = inject(DialogService);
  private readonly translateService = inject(TranslateService);

  get state(): ObservableDictionary<OverviewStateModel> {
    return {
      isLoading: this.store.select(CashFlowSelectors.isLoading),
      cashFlowDataSet: this.cashFlowData$,
      incomesChartData: this.incomesChartData$,
      expensesChartData: this.expensesChartData$,
    };
  }

  addQuickNote$(): Observable<Note | undefined> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(NoteFormComponent, {
      header: this.translateService.instant('tasker.addNote'),
      style: baseDialogStyles,
    });

    return dialogRef.onClose.pipe(
      tap((note?: Note) => {
        if (note) {
          this.store.dispatch(TaskerActions.addNote({ note }));
          this.taskerService.setActiveTabIndex(1);
          void this.router.navigate([AppPaths.TASKER]);
        }
      })
    );
  }

  private get incomesChartData$(): Observable<ChartData | undefined> {
    return combineLatest({
      incomes: this.store.select(CashFlowSelectors.cashFlow('income')),
      categories: this.store.select(ConfigSelectors.cashFlowCategories('income')),
    }).pipe(map(({ incomes, categories }) => this.generateCashFlowChartData(incomes, categories, 'green')));
  }

  private get expensesChartData$(): Observable<ChartData | undefined> {
    return combineLatest({
      expenses: this.store.select(CashFlowSelectors.cashFlow('expense')),
      categories: this.store.select(ConfigSelectors.cashFlowCategories('expense')),
    }).pipe(map(({ expenses, categories }) => this.generateCashFlowChartData(expenses, categories, 'pink')));
  }

  private get cashFlowData$(): Observable<LabeledData<number>[]> {
    return combineLatest({
      totalBalance: this.totalBalance$,
      totalIncome: this.store.select(CashFlowSelectors.totalCashFlow('income')),
      totalExpense: this.store.select(CashFlowSelectors.totalCashFlow('expense')),
      transactionAmount: this.transactionAmount$,
    }).pipe(
      map((data) => [
        { label: 'totalIncome', data: data.totalIncome },
        { label: 'totalExpense', data: data.totalExpense },
        { label: 'totalBalance', data: data.totalBalance },
        { label: 'transactionAmount', data: data.transactionAmount },
      ])
    );
  }

  private get totalBalance$(): Observable<number> {
    return combineLatest({
      totalIncomes: this.store.select(CashFlowSelectors.totalCashFlow('income')),
      totalExpenses: this.store.select(CashFlowSelectors.totalCashFlow('expense')),
    }).pipe(map(({ totalIncomes, totalExpenses }) => totalIncomes - totalExpenses));
  }

  private get transactionAmount$(): Observable<number> {
    return combineLatest({
      incomesLength: this.store.select(CashFlowSelectors.cashFlow('income')).pipe(map((incomes) => incomes.length)),
      expensesLength: this.store.select(CashFlowSelectors.cashFlow('expense')).pipe(map((expenses) => expenses.length)),
    }).pipe(map(({ incomesLength, expensesLength }): number => incomesLength + expensesLength));
  }

  private generateCashFlowChartData(
    cashFlowList: CashFlow[],
    categories: Category[],
    chartColorPalette: ChartColor
  ): ChartData | undefined {
    if (!cashFlowList.length) return undefined;

    const data: number[] = this.calculateCashflow(cashFlowList, categories);
    const { backgroundColor, hoverBackgroundColor } = this.generateBgColors(data.length, chartColorPalette);

    return {
      labels: categories.map(({ name }: Category) => name),
      datasets: [{ data, backgroundColor, hoverBackgroundColor }],
    };
  }

  private calculateCashflow(cashFlowList: CashFlow[], categories: Category[]): number[] {
    return categories.map((category: Category) => {
      return cashFlowList.reduce((total: number, cashFlow: CashFlow) => {
        return cashFlow.categoryId === category.id ? total + cashFlow.amount : total;
      }, 0);
    });
  }

  private generateBgColors(amountOfColors: number, color: ChartColor) {
    const getClr = (clr: string): string => {
      return getComputedStyle(document.documentElement).getPropertyValue(clr);
    };

    return {
      backgroundColor: Array.from({ length: amountOfColors }, () => {
        const colorScale = getRandomNumber(4, 9);
        return getClr(`--${color}-${colorScale}00`);
      }),
      hoverBackgroundColor: Array.from({ length: amountOfColors }, () => {
        const colorScale = getRandomNumber(4, 9);
        return getClr(`--${color}-${colorScale - 2}00`);
      }),
    };
  }
}