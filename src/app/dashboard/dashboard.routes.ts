import { Routes } from '@angular/router';
import { StatisticComponent } from '../operations/statistic/statistic.component';
import { OperationsComponent } from '../operations/operations.component';
import { DetailComponent } from '../operations/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticComponent },
    { path: 'operations', component: OperationsComponent },
    { path: 'detail', component: DetailComponent }
];