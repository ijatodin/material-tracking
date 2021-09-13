import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-management',
  templateUrl: './location-management.component.html',
  styleUrls: ['./location-management.component.scss'],
})
export class LocationManagementComponent implements OnInit {
  locationData: any = null;
  formData: any = {};
  forParent: any = [];
  isParent: boolean = false;

  constructor(
    private locSvc: LocationService,) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.locSvc.getAll().subscribe((res) => {
      this.locationData = res.model;
      console.log(this.locationData);
    });
  }

  getParent() {
    this.locSvc.getAll().subscribe((res) => {
      this.forParent = res.model;
      console.log(this.locationData);
    });
  }

  setParent() {
    if (this.isParent === false) {
      this.getParent();
      this.isParent = true;
    } else {
      this.isParent = false;
      this.formData.parent_id = "";
      console.log(this.formData);
    }
  }

  formatStatus(data: any) {
    let res: string = "";

    switch (data) {
      case 1:
        res = "Active";
        break;
      case 8:
        res = "InActive";
        break;
    }
    return res;
  }

  submitData() {
    console.log(this.formData);
    this.locSvc.storeLocation(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        console.log(res.model);
        this.formData = {};
        this.getAll();
      }
    });
  }
}
