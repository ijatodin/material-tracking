import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../services/file-upload.service';
import { PurchaseOrderService } from '../services/purchase-order.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  formData: any = null;
  poData: any = [];
  file: any = null;
  url: any = environment.url;
  closeResult: any;

  constructor(
    private fileSvc: FileUploadService,
    private poSvc: PurchaseOrderService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.poSvc.getData().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.poData = res.model;
        console.log(this.poData);
      }
    });
  }

  setNew() {
    this.formData = null;
  }

  setItem(data: any) {
    this.formData = data.name;
    console.log(this.formData);
  }

  promptDelete(content: any) {
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

  handleFile(event: any) {
    this.file = event.target.files.item(0);
    console.log(this.file);
  }

  submitData() {
    const uploadData = new FormData();
    uploadData.append("file", this.file, this.file.name);
    uploadData.append("type", "2");
    uploadData.append("form", this.formData);
    this.poSvc.storeData(uploadData).subscribe((res) => {
      if(res.message === 'SUCCESS') {
        console.log(res.model);
        this.getData();
      }
    });
  }

}
