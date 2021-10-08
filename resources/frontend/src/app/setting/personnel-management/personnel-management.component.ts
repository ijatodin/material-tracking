import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel.service';

@Component({
  selector: 'app-personnel-management',
  templateUrl: './personnel-management.component.html',
  styleUrls: ['./personnel-management.component.scss']
})
export class PersonnelManagementComponent implements OnInit {

  personnelData: any = [];
  formData: any = {
    personnel: {}
  };

  constructor(
    private personnelSvc: PersonnelService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.personnelSvc.getAll().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.personnelData = res.model;
        console.log(this.personnelData);
      }
    });
  }

  setItem(data: any) {
    this.formData = data;
  }

  formatRole(data: any) {
    let res: string = '';

    switch (data) {
      case 1:
        res = 'Maker';
        break;
      case 2:
        res = 'Checker';
        break;
      case 3:
        res = 'Approver';
        break;
    }
    return res;
  }

  submit() {
    this.personnelSvc.storePersonnel(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        console.log(res.model);
        this.formData = {
          personnel: {}
        };
        this.getData();
      }
    });
  }

}
