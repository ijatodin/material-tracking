import { Component, OnInit } from '@angular/core';
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

  constructor(private suppSvc: SupplierService) {
    this.formData.parent_id = '';
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.suppSvc.getAll().subscribe((res) => {
      this.supplierData = res.model;
      console.log(this.supplierData);
    });
  }

  getSupplier() {
    this.suppSvc.getSupplier().subscribe((res) => {
      this.forSubcon = res.model;
      console.log(this.forSubcon);
    });
  }

  setSubcon() {
    if (this.isSubcon === false) {
      this.getSupplier();
      this.isSubcon = true;
    } else {
      this.isSubcon = false;
      this.formData.parent_id = '';
      console.log(this.formData);
    }
  }

  setItem(data: any) {
    this.formData = data;
    console.log(this.formData);
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
    console.log(this.formData);
    this.suppSvc.storeSupplier(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        console.log(res.model);
        this.getAll();
        this.formData = {};
      }
    });
  }
}
