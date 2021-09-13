import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReceivingService } from 'src/app/services/receiving.service';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-receiving-form',
  templateUrl: './receiving-form.component.html',
  styleUrls: ['./receiving-form.component.scss']
})
export class ReceivingFormComponent implements OnInit {

  formData: any = {
    remarks: '',
    details: [],
  };
  locationData: any = [];
  materialData: any = [];
  supplierData: any = [];
  subconData: any = [];
  selectedSupplier: any;
  selectedMaterial: any = {
  };
  searchTerm: string = '';
  closeResult: string = '';

  constructor(
    private locSvc: LocationService,
    private supplierSvc: SupplierService,
    private modalService: NgbModal,
    private receivingSvc: ReceivingService,
    private materialSvc: MaterialService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.locSvc.getLocation().subscribe((res) => {
      this.locationData = res.model;
    });
    this.supplierSvc.getSupplier().subscribe((res) => {
      this.supplierData = res.model;
    });
  }

  setSubcon() {
    this.formData.supplier = this.selectedSupplier.name;
    this.subconData = this.selectedSupplier.subcon;
    console.log(this.selectedSupplier);
  }

  searchMaterial(searchTerm: string) {
    let search = {search: searchTerm};
    this.materialSvc.search(search).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.materialData = res.model;
        console.log(this.materialData);
      }
    });
  }

  selectMaterial(data:any) {
    this.selectedMaterial = data;
    this.selectedMaterial.remarks = '';
  }

  addToDetails() {
    console.log(this.selectedMaterial);
    this.formData.details.push(this.selectedMaterial);
    this.selectedMaterial = {};
  }

  modalOpen(content: any) {
    this.modalService
      .open(content, { size: "lg", scrollable: true })
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
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  submitReceiving() {
    console.log(this.formData);
    this.receivingSvc.store(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.router.navigate(["/receiving"]);
      }
    });
  }

}
