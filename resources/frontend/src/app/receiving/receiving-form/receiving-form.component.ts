import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReceivingService } from 'src/app/services/receiving.service';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SupplierService } from 'src/app/services/supplier.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

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
  poData: any = [];
  selectedSupplier: any;
  selectedMaterial: any = {};
  searchTerm: string = '';
  closeResult: string = '';
  do_file: any = null;
  hasFile: boolean = false;
  url: string = environment.url;

  constructor(
    private locSvc: LocationService,
    private supplierSvc: SupplierService,
    private modalService: NgbModal,
    private receivingSvc: ReceivingService,
    private materialSvc: MaterialService,
    private fileSvc: FileUploadService,
    private poSvc: PurchaseOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
    this.cleardo();
  }

  getData() {
    this.locSvc.getLocation().subscribe((res) => {
      this.locationData = res.model;
    });
    this.supplierSvc.getSupplier().subscribe((res) => {
      this.supplierData = res.model;
    });
    this.supplierSvc.getSubcon().subscribe((res) => {
      this.subconData = res.model;
    });
    this.poSvc.getData().subscribe((res) => {
      this.poData = res.model;
    });
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
    this.selectedMaterial.location_id = this.selectedMaterial.location.id;
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

  cleardo() {
    this.fileSvc.clearDo().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        console.log(res.model);
      } else {
        console.log(res.message);
      }
    });
  }

  handleFile(event: any) {
    this.do_file = event.target.files.item(0);
    console.log(this.do_file);
  }

  uploadDoFile() {
    const uploadData = new FormData();
    uploadData.append("file", this.do_file, this.do_file.name);
    uploadData.append("type", "1");
    console.log(uploadData);
    this.fileSvc.storeFile(uploadData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.formData.do_file = res.model;
        console.log(this.formData);
        this.hasFile = true;
      }
    })
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
