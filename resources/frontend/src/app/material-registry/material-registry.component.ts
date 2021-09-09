import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-material-registry',
  templateUrl: './material-registry.component.html',
  styleUrls: ['./material-registry.component.scss'],
})
export class MaterialRegistryComponent implements OnInit {
  materialData: any = null;
  formData: any = {};

  constructor(private materialSvc: MaterialService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.materialSvc.getAll().subscribe((res) => {
      this.materialData = res.model;
      console.log(this.materialData);
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
