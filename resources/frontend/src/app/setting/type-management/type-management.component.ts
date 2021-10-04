import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-type-management',
  templateUrl: './type-management.component.html',
  styleUrls: ['./type-management.component.scss']
})
export class TypeManagementComponent implements OnInit {

  formData: any = {};
  typeData: any = [];

  constructor(
    private typeSvc: TypeService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.typeSvc.getAll().subscribe((res) => {
      this.typeData = res.model;
    });
  }

  formatStatus(data: any) {
    let res: string = "";

    switch (data) {
      case 1:
        res = "Active";
        break;
      case 0:
        res = "InActive";
        break;
    }
    return res;
  }

  submit() {
    this.typeSvc.storeType(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.formData = {};
        this.getData();
      }
    });
  }

}
