import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OperationsComponent } from './operations.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { operationsReducer } from './store/operations.reducer';

const COMPONENTS = [
  DashboardComponent,
  OperationsComponent,
  StatisticComponent,
  DetailComponent
];
const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  ChartsModule,
  SharedModule,
  DashboardRoutingModule,
  StoreModule.forFeature('operations', operationsReducer)
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
})
export class OperationsModule { }
