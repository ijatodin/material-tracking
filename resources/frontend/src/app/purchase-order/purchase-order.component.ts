import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../services/file-upload.service';
import { PurchaseOrderService } from '../services/purchase-order.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
})
export class PurchaseOrderComponent implements OnInit {
  formData: any = {};
  poData: any = [];
  file: any = null;
  url: any = environment.url;
  closeResult: any;
  errMessage: any = [];
  hasFile: boolean = false;
  data: any = [];
  searchTerm: string = '';
  page = 1;
  pageSize = 10;
  collectionSize: any;

  constructor(
    private fileSvc: FileUploadService,
    private poSvc: PurchaseOrderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.poSvc.getData().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.poData = res.model;
        this.collectionSize = this.poData.length;
        // console.log(this.poData);
      }
    }).add(() => {
      this.refreshData();
    });
  }

  refreshData() {
    this.data = this.poData
      .map((po, i) => ({ count: i + 1, ...po }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  setNew() {
    this.formData = {};
    this.hasFile = false;
  }

  setItem(data: any) {
    this.formData = data;
    this.hasFile = true;
    // console.log(this.formData);
  }

  setUpload() {
    this.hasFile = false;
  }

  promptDelete(content: any) {
    this.modalService
      .open(content, { size: 'lg', scrollable: true })
      .result.then(
        (result) => {
          //function di sini

          this.poSvc.delete(result).subscribe((res) => {
            if (res.message === 'SUCCESS') {
              this.getData();
              this.setNew();
            }
          });
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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  handleFile(event: any) {
    this.file = event.target.files.item(0);
    // console.log(this.file);
  }

  openError(content: any) {
    this.modalService
      .open(content, { size: 'lg', scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          // console.log(result);
        },
        (reason) => {
          this.closeResult = this.getDismissReason(reason);
          // console.log(this.closeResult);
        }
      );
  }

  submitData() {
    const uploadData = new FormData();
    uploadData.append('file', this.file, this.file.name);
    uploadData.append('type', '2');
    uploadData.append('name', this.formData.name);
    this.poSvc.storeData(uploadData).subscribe(
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
}
