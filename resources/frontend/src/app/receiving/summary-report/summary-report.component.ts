import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { PersonnelService } from 'src/app/services/personnel.service';
import { ProjectService } from 'src/app/services/project.service';
import { SummaryService } from 'src/app/services/summary.service';
import { SupplierService } from 'src/app/services/supplier.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],
})
export class SummaryReportComponent implements OnInit {
  detailsData: any = {};
  projectData: any = [];
  subconData: any = [];
  supplierData: any = [];
  materialData: any = [];
  selectedProject: any = null;
  personnelData: any = [];
  makerData: any = [];
  checkerData: any = [];
  approverData: any = [];
  selectedMaker: any = null;
  selectedChecker: any = null;
  selectedApprover: any = null;
  selectedSubcon: any = {};
  selectedSupplier: any = {};
  data: any = [];
  signCheck: boolean = false;
  formData: any = {};
  isGenerated: boolean = false;
  isSupplier: boolean = false;
  isSubcon: boolean = false;
  isDescription: boolean = false;
  filterBy: any = null;

  constructor(
    private summarySvc: SummaryService,
    private projectSvc: ProjectService,
    private personnelSvc: PersonnelService,
    private supplierSvc: SupplierService,
    private materialSvc: MaterialService
  ) {}

  ngOnInit(): void {
    // this.getDetails();
    this.getProject();
    this.getPersonnel();
    this.getSupplierSubcon();
    this.getMaterial();
  }

  test() {
    console.log(this.formData);
    this.summarySvc.generate(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        console.log(res.model);
        this.detailsData = res.model;
        for (let key of Object.keys(this.detailsData)) {
          let detail = this.detailsData[key];
          this.data.push(detail);
          console.log(this.data);
        }
        this.isGenerated = true;
      }
    });
  }

  handleFilter() {
    console.log(this.filterBy);
    if (this.filterBy === 1) {
      this.isSupplier = true;
      this.isDescription = false;
      this.isSubcon = false;

      this.formData.filterBy = 'supplier_id';
    } else if (this.filterBy === 2) {
      this.isSupplier = false;
      this.isDescription = false;
      this.isSubcon = true;

      this.formData.filterBy = 'subcon_id';
    } else if (this.filterBy === 3) {
      this.isSupplier = false;
      this.isDescription = true;
      this.isSubcon = false;

      this.formData.filterBy = 'description';
    }
  }

  getSupplierSubcon() {
    this.supplierSvc.getSubcon().subscribe((res) => {
      this.subconData = res.model;
    });

    this.supplierSvc.getSupplier().subscribe((res) => {
      this.supplierData = res.model;
    });
  }

  getProject() {
    this.projectSvc.getAll().subscribe((res) => {
      this.projectData = res.model;
    });
  }

  getMaterial() {
    this.materialSvc.getAll().subscribe((res) => {
      this.materialData = res.model;
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
    });
  }

  personnelCheck() {
    if (
      this.selectedMaker != null &&
      this.selectedChecker != null &&
      this.selectedApprover != null
    ) {
      this.signCheck = true;
    }
  }

  exportPdf() {
    
  }
}
