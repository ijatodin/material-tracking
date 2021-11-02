import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialService } from 'src/app/services/material.service';
import { PersonnelService } from 'src/app/services/personnel.service';
import { ProjectService } from 'src/app/services/project.service';
import { SummaryService } from 'src/app/services/summary.service';
import { SupplierService } from 'src/app/services/supplier.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  ModalDismissReasons,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import * as XLSX from "xlsx";
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

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
  personnelData: any = [];
  formData: any = {};
  makerData: any = [];
  checkerData: any = [];
  approverData: any = [];
  summaryData: any = [];
  saveData: any = {};
  data: any = [];
  selectedMaker: any = null;
  selectedChecker: any = null;
  selectedApprover: any = null;
  selectedSubcon: any = {};
  selectedSupplier: any = {};
  selectedProject: any = null;
  selectedSummary: any = [];
  signCheck: boolean = false;
  isGenerated: boolean = false;
  isSupplier: boolean = false;
  isSubcon: boolean = false;
  isDescription: boolean = false;
  hasData: boolean = true;
  filterBy: any = null;
  closeResult: string = '';
  summaryDetails: any = [];
  isCollapsed: boolean = true;
  saved: boolean = false;
  currentUser: any;
  url: any = environment.url;
  poData: any = [];


  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private summarySvc: SummaryService,
    private projectSvc: ProjectService,
    private personnelSvc: PersonnelService,
    private supplierSvc: SupplierService,
    private materialSvc: MaterialService,
    private authSvc: AuthenticationService,
    private poSvc: PurchaseOrderService,
    private modalService: NgbModal,
    private elementRef: ElementRef,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.currentUser = this.authSvc.currentUserValue;
  }

  ngOnInit(): void {
    this.getProject();
    this.getPersonnel();
    this.getSupplierSubcon();
    this.getMaterial();
    this.getSummary();
  }

  onDateSelection(inst) {
    console.log(inst);
  }

  // Please comment if anything used for testing and also comment when it is supposed deprecated
  generate() {
    this.hasData = true;
    // console.log(this.formData);
    this.summarySvc.generate(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        // console.log(res.model);
        this.detailsData = res.model;
        if (this.detailsData.length === 0) {
          this.hasData = false;
        } else {
          for (let key of Object.keys(this.detailsData)) {
            let detail = this.detailsData[key];
            this.data.push(detail);
            // console.log(this.data);
          }
          this.isGenerated = true;
        }
      }
    });
  }

  // deprecated
  handleFilter() {
    // console.log(this.filterBy);
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

    this.poSvc.getData().subscribe((res) => {
      this.poData = res.model;
    });
  }

  getProject() {
    this.projectSvc.getAll().subscribe((res) => {
      this.projectData = res.model;
      this.selectedProject = this.projectData[0];
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
      // console.log(this.personnelData);
      for (let obj of Object.keys(this.personnelData)) {
        if (obj === '1') {
          this.makerData = this.personnelData[obj];
          this.defaultMaker();
        } else if (obj === '2') {
          this.checkerData = this.personnelData[obj];
        } else if (obj === '3') {
          this.approverData = this.personnelData[obj];
        }
      }
    });
  }

  defaultMaker() {
    let index = this.makerData.filter(
      (r: any) => r.id === this.currentUser.user.personnel_id
    );
    if (index.length > 0) {
      this.selectedMaker = index[0];
    }
    console.log(this.selectedMaker);
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

  getSummary() {
    this.summarySvc.getAll().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.summaryData = res.model;
        // console.log(this.summaryData);
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
          // console.log(this.selectedSummary);
        }
      }
    });
  }

  saveSlip() {
    this.saveData.details = this.data;
    this.saveData.maker = this.selectedMaker;
    this.saveData.checker = this.selectedChecker;
    this.saveData.approver = this.selectedApprover;
    // console.log(this.saveData);

    this.summarySvc.save(this.saveData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        // console.log(res.model);
        this.saveData = {};
        this.saved = true;
        this.getSummary();
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
        res = 'Approved';
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

  // wip need another plugin to exprt as PDF as this is not very convenient
  exportPdf(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('summary' + this.formData.range + '.pdf');
    });
  }

  exportSummary() {
    /* table id is passed over here */
    let element = document.getElementById("summary-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(
      wb,
      "Summary_" + this.selectedSummary.sum_no + ".xlsx"
    );
  }
}
