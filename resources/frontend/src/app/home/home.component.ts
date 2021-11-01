import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { ProjectService } from '../services/project.service';
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
  selectedProject: any = {};
  currentUser: any;
  url: any = environment.url;

  constructor(
    private summarySvc: SummaryService,
    private projectSvc: ProjectService,
    private authSvc: AuthenticationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getSummary();
    this.getProject();
    this.currentUser = this.authSvc.currentUserValue;
  }

  getSummary() {
    this.summarySvc.getAll().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.summaryData = res.model;
        this.filterRole();
        // console.log(this.summaryData);
      }
    });
  }

  filterRole() {
    // console.log(this.currentUser.user.role);
    if (this.currentUser.user.role === 2) {
      let index = this.summaryData.filter(
        (r: any) => (r.status === 1 && r.checker_id === this.currentUser.user.personnel_id)
      );
      this.summaryData = index;
    } else if (this.currentUser.user.role === 3) {
      let index = this.summaryData.filter(
        (r: any) => (r.status === 2 && r.approver_id === this.currentUser.user.personnel_id)
      );
      this.summaryData = index;
    }
  }

  getProject() {
    this.projectSvc.getAll().subscribe((res) => {
      this.selectedProject = res.model[0];
    });
  }

  getSingle(item: any) {
    this.selectedSummary = item;
    console.log(this.selectedSummary);
    let data = { id: this.selectedSummary.id };
    this.summarySvc.getSingle(data).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.summaryDetails = [];
        for (let key of Object.keys(res.model)) {
          let detail = res.model[key];
          this.summaryDetails.push(detail);
          // console.log(this.selectedSummary);
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

  approval() {
    this.summarySvc.approval(this.selectedSummary).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        console.log(res.model);
        this.getSummary();
      }
    });
  }

  modalOpen(content: any) {
    this.modalService
      .open(content, { size: 'xl', scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          // console.log(result);
        },
        (reason) => {
          this.closeResult = this.getDismissReason(reason);
          // console.log(this.closeResult);
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
