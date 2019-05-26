import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromOperators from '../store/operations.reducer';
import { Operation, typeOperation } from '../operations.model';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: []
})
export class StatisticComponent implements OnInit, OnDestroy {

  operationsSubscribe: Subscription = new Subscription();

  income = 0;
  numIncome = 0;
  withdrawal = 0;
  numWithdrawal = 0;

  public doughnutChartLabels: Label[] = ['Gastos', 'Ingresos'];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<fromOperators.AppState>) {
    this.operationsSubscribe =  this.store.select('operations').subscribe(
      (opertionsStore: fromOperators.OperationsState) => {
        this.countOperations(opertionsStore.items);
      }
    );
  }

  private countOperations(operations: Operation[]) {
    this.income = 0;
    this.numIncome = 0;
    this.withdrawal = 0;
    this.numWithdrawal = 0;
    operations.forEach(operation => {
      if (operation.type === typeOperation.income) {
        this.income += operation.amount;
        this.numIncome++;
      } else {
        this.withdrawal += operation.amount;
        this.numWithdrawal++;
      }
    });
    this.doughnutChartData = [this.withdrawal, this.income];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.operationsSubscribe.unsubscribe();
  }

}
