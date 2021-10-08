import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../services/summary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  summaryData: any = [];

  constructor(
    private summarySvc: SummaryService
  ) { }

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary() {
    this.summarySvc.getAll().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.summaryData = res.model;
        console.log(this.summaryData);
      }
    });
  }

}
