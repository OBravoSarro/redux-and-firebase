import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations/operations.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private _operations: OperationsService) {
    this._operations.initOperationsListener();
  }

  ngOnInit() {
  }

}
