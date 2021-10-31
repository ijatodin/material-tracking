import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: any;

  constructor(
    private materialSvc: MaterialService,
    private typeSvc: TypeService,
    private modalService: NgbModal
    ) {}

  ngOnInit(): void {
    this.getAll();
    this.getType();
  }

  getAll() {
    this.materialSvc.getAll().subscribe((res) => {
      this.materialData = res.model;
      // console.log(this.materialData);
    });
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

          this.materialSvc.delete(result).subscribe((res)=> {
            if (res.message === 'SUCCESS') {
              this.formData = {};
              this.getAll();
            }
          })
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

  delete() {

  }

  getType() {
    this.typeSvc.getAll().subscribe((res) => {
      this.typeData = res.model;
      // console.log(this.typeData);
    });
  }

  submitData() {
    // console.log(this.formData);
    this.materialSvc.storeMaterial(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        // console.log(res.model);
        this.formData = {};
        this.getAll();
      } else {
        // console.log(res.message);
      }
    });
  }
}
