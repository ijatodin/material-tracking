import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-type-management',
  templateUrl: './type-management.component.html',
  styleUrls: ['./type-management.component.scss']
})
export class TypeManagementComponent implements OnInit {

  formData: any = {};
  typeData: any = [];
  selectedType: any = {};
  closeResult: any;

  constructor(
    private typeSvc: TypeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.typeSvc.getAll().subscribe((res) => {
      this.typeData = res.model;
      console.log(this.typeData);
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

  setDetails(data: any) {
    this.formData = data;
    console.log(this.formData);
  }

  promptDelete(content: any) {
    this.modalService
      .open(content, { size: "lg", scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          this.typeSvc.delete(result).subscribe((res)=>{
            if(res.message === 'SUCCESS') {
              this.formData = {personnel: {}};
              this.getData();
            }
          });
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

  submit() {
    this.typeSvc.storeType(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.formData = {};
        this.getData();
      }
    });
  }

}
