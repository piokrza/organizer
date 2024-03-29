import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';

import { CashFlowComponent, CashFlowRoutingModule } from '@ngpk/cash-flow/feature';
import { CashFlowFacadeService, CashFlowFilterService, CashFlowPaginationService, OverviewService } from '@ngpk/cash-flow/service';
import {
  AddFormComponent,
  CashFlowCardsComponent,
  CashFlowChartComponent,
  DetailsBoxComponent,
  TileComponent,
  TileListComponent,
  UpdateFormComponent,
} from '@ngpk/cash-flow/shared';
import { TimestampPipe } from '@ngpk/core/pipe';
import { ContainerComponent } from '@ngpk/shared-ui/shared';

const declarations = [TileComponent, DetailsBoxComponent, TileListComponent, AddFormComponent, UpdateFormComponent, CashFlowComponent];

const imports = [
  CashFlowRoutingModule,
  CommonModule,
  CardModule,
  InputTextareaModule,
  InputTextModule,
  InputNumberModule,
  TranslateModule,
  DropdownModule,
  CalendarModule,
  ReactiveFormsModule,
  DataViewModule,
  ProgressSpinnerModule,
  DividerModule,
  TabViewModule,
  TimestampPipe,
  ContainerComponent,
  MultiSelectModule,
  PaginatorModule,
  CashFlowCardsComponent,
  CashFlowChartComponent,
];

const providers = [CashFlowFacadeService, CashFlowPaginationService, CashFlowFilterService, OverviewService];

@NgModule({ declarations, imports, providers })
export class CashFlowModule {}
