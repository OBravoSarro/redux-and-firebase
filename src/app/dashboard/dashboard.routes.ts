import { Routes } from '@angular/router';
import { StatisticComponent } from '../entry-exit/statistic/statistic.component';
import { EntryExitComponent } from '../entry-exit/entry-exit.component';
import { DetailComponent } from '../entry-exit/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticComponent },
    { path: 'entry-exit', component: EntryExitComponent },
    { path: 'detail', component: DetailComponent }
];