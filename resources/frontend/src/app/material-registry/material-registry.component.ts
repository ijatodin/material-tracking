import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';
import { TypeService } from '../services/type.service';

@Component({
  selector: 'app-material-registry',
  templateUrl: './material-registry.component.html',
  styleUrls: ['./material-registry.component.scss'],
})
export class MaterialRegistryComponent implements OnInit {
  materialData: any = null;
  formData: any = {};
  typeData: any = [];

  constructor(
    private materialSvc: MaterialService,
    private typeSvc: TypeService
    ) {}

  ngOnInit(): void {
    this.getAll();
    this.getType();
  }

  getAll() {
    this.materialSvc.getAll().subscribe((res) => {
      this.materialData = res.model;
      console.log(this.materialData);
    });
  }

  getType() {
    this.typeSvc.getAll().subscribe((res) => {
      this.typeData = res.model;
      console.log(this.typeData);
    });
  }

  submitData() {
    console.log(this.formData);
    this.materialSvc.storeMaterial(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        console.log(res.model);
        this.formData = {};
        this.getAll();
      } else {
        console.log(res.message);
      }
    });
  }
}
