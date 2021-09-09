import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ReceivingService } from 'src/app/services/receiving.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-receiving-form',
  templateUrl: './receiving-form.component.html',
  styleUrls: ['./receiving-form.component.scss']
})
export class ReceivingFormComponent implements OnInit {

  formData: any = {};
  locationData: any = {};
  materialData: any = {};
  supplierData: any = [];
  subconData: any = [];
  selectedSupplier: any;
  selectedMaterial: any = {};

  constructor(
    private locSvc: LocationService,
    private supplierSvc: SupplierService,
    private receivingSvc: ReceivingService
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

}
