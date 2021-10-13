import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from '../services/summary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  closeResult: string = '';
  summaryData: any = [];
  selectedSummary: any = [];
  summaryDetails: any = [];

  constructor(
    private summarySvc: SummaryService,
    private modalService: NgbModal
  ) {}

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

  getSingle(item: any) {
    this.selectedSummary = item;
    let data = { id: this.selectedSummary.id };
    this.summarySvc.getSingle(data).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.summaryDetails = [];
        for (let key of Object.keys(res.model)) {
          let detail = res.model[key];
          this.summaryDetails.push(detail);
          console.log(this.selectedSummary);
        }
      }
    });
  }

  formatStatus(data: any) {
    let res: string = '';

    switch (data) {
      case 1:
        res = 'New';
        break;
      case 2:
        res = 'Pending Approval';
        break;
      case 3:
        res = 'Closed';
        break;
    }
    return res;
  }

  modalOpen(content: any) {
    this.modalService
      .open(content, { size: 'xl', scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          console.log(result);
        },
        (reason) => {
          this.closeResult = this.getDismissReason(reason);
          console.log(this.closeResult);
        }
      );
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
