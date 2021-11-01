import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelService } from 'src/app/services/personnel.service';

@Component({
  selector: 'app-personnel-management',
  templateUrl: './personnel-management.component.html',
  styleUrls: ['./personnel-management.component.scss'],
})
export class PersonnelManagementComponent implements OnInit {
  personnelData: any = [];
  formData: any = {
    personnel: {},
  };
  file: any = null;
  closeResult: any;

  constructor(
    private personnelSvc: PersonnelService,
    private modalService: NgbModal
  ) {}

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

  setNew() {
    this.formData = {
      personnel: {},
    };
  }

  setItem(data: any) {
    this.formData = data;
    console.log(this.formData);
  }

  uploadModal(content: any) {
    this.modalService
      .open(content, { size: 'lg', scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          console.log(result);
          this.submitSignature();
        },
        (reason) => {
          this.closeResult = this.getDismissReason(reason);
          console.log(this.closeResult);
        }
      );
  }

  submitSignature() {
    const uploadData = new FormData();
    uploadData.append('sign', this.file, this.file.name);
    uploadData.append('personnel_id', this.formData.personnel_id);
    this.personnelSvc.storeSignature(uploadData).subscribe(
      (res) => {
        if (res.message === 'SUCCESS') {
          // console.log(res.model);
          this.getData();
        }
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  handleFile(event: any) {
    this.file = event.target.files.item(0);
    if (this.file.type === "image/png" || this.file.type === "image/x-png"){
      console.log(true);
    } else {
      this.file = null;
    }

  }

  promptDelete(content: any) {
    this.modalService
      .open(content, { size: 'lg', scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          this.personnelSvc.delete(result).subscribe((res) => {
            if (res.message === 'SUCCESS') {
              this.formData = { personnel: {} };
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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
          personnel: {},
        };
        this.getData();
      }
    });
  }
}
