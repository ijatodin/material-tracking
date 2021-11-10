import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-management',
  templateUrl: './supplier-management.component.html',
  styleUrls: ['./supplier-management.component.scss'],
})
export class SupplierManagementComponent implements OnInit {
  supplierData: any = null;
  formData: any = {};
  isSubcon: boolean = false;
  forSubcon: any = [];
  opened: boolean;
  closeResult: any;
  data: any = [];
  searchTerm: string = '';
  page = 1;
  pageSize = 10;
  collectionSize: any;

  constructor(
    private suppSvc: SupplierService,
    private modalService: NgbModal
    ) {
    this.formData.parent_id = '';
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.suppSvc.getAll().subscribe((res) => {
      this.supplierData = res.model;
      this.collectionSize = this.supplierData.length;
    }).add(() => {
      this.refreshData();
    });
  }

  refreshData() {
    this.data = this.supplierData
      .map((supplier, i) => ({ count: i + 1, ...supplier }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  getSupplier() {
    this.suppSvc.getSupplier().subscribe((res) => {
      this.forSubcon = res.model;
      // console.log(this.forSubcon);
    });
  }

  setSubcon() {
    if (this.isSubcon === false) {
      this.getSupplier();
      this.isSubcon = true;
    } else {
      this.isSubcon = false;
      this.formData.parent_id = '';
      // console.log(this.formData);
    }
  }

  setNew() {
    this.formData = {};
  }

  setItem(data: any) {
    this.formData = data;
    // console.log(this.formData);
  }

  promptDelete(content: any) {
    this.modalService
      .open(content, { size: "lg", scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          this.suppSvc.delete(result).subscribe((res)=>{
            if(res.message === 'SUCCESS') {
              this.formData = {};
              this.getAll();
            }
          });
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
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  formatRole(data: any) {
    let res: string = '';

    switch (data) {
      case 1:
        res = 'Supplier';
        break;
      case 2:
        res = 'Subcon';
        break;
      case 3:
        res = 'Supplier & Subcon';
        break;
    }
    return res;
  }

  submitData() {
    // console.log(this.formData);
    this.suppSvc.storeSupplier(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        // console.log(res.model);
        this.getAll();
        this.formData = {};
      }
    });
  }
}
