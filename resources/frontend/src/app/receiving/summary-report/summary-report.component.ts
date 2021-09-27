import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel.service';
import { ProjectService } from 'src/app/services/project.service';
import { SummaryService } from 'src/app/services/summary.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {

  detailsData: any = {};
  projectData: any = [];
  subconData: any = [];
  selectedProject: any = null;
  personnelData: any = [];
  makerData: any = [];
  checkerData: any = [];
  approverData: any = [];
  selectedMaker: any = null;
  selectedChecker: any = null;
  selectedApprover: any = null;
  selectedSubcon: any = {};
  data: any = [];
  signCheck: boolean = false;

  constructor(
    private summarySvc: SummaryService,
    private projectSvc: ProjectService,
    private personnelSvc: PersonnelService,
    private supplierSvc: SupplierService
  ) { }

  ngOnInit(): void {
    this.getDetails();
    this.getProject();
    this.getPersonnel();
    this.getSubcon();
  }

  getSubcon() {
    this.supplierSvc.getSubcon().subscribe((res) => {
      this.subconData = res.model;
    });
  }

  getProject() {
    this.projectSvc.getAll().subscribe((res) => {
      this.projectData = res.model;
    });
  }

  getPersonnel() {
    this.personnelSvc.getGroup().subscribe((res) => {
      this.personnelData = res.model;
      console.log(this.personnelData);
      for (let obj of Object.keys(this.personnelData)) {
        if (obj === '1') {
          this.makerData = this.personnelData[obj];
        } else if (obj === '2') {
          this.checkerData = this.personnelData[obj];
        } else if (obj === '3') {
          this.approverData = this.personnelData[obj];
        }
      }
    });
  }

  getDetails() {
    this.summarySvc.getDetails().subscribe((res) => {
      this.detailsData = res.model;
      console.log(this.detailsData);
      for (let key of Object.keys(this.detailsData)) {
        let detail = this.detailsData[key];
        this.data.push(detail);
        console.log(this.data);
      }
    })
  }

  personnelCheck() {
    if (this.selectedMaker != null && this.selectedChecker != null && this.selectedApprover != null) {
      this.signCheck = true;
    }
  }

}
