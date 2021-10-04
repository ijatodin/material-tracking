import { Component, OnInit } from '@angular/core';
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

  constructor(
    private fileSvc: FileUploadService,
    private poSvc: PurchaseOrderService
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
