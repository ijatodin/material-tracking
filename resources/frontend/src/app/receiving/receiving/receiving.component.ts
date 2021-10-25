import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReceivingService } from 'src/app/services/receiving.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.scss']
})
export class ReceivingComponent implements OnInit {

  receivingData:any = null;
  selectedReceiving: any = {
    location: {},
    supplier: {},
    subcon: {}
  };
  url: string = environment.url;
  closeResult: any;

  constructor(
    private receivingSvc: ReceivingService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  setDetails(data: any) {
    this.selectedReceiving = data;
    console.log(this.selectedReceiving);
  }

  formatStatus(data: any) {
    let res: string = '';

    switch (data) {
      case 1:
        res = 'Draft';
        break;
      case 0:
        res = 'Completed';
        break;
    }
    return res;
  }

  getData() {
    this.receivingSvc.getReceiving().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.receivingData = res.model;
        console.log(this.receivingData);
      }
    })
  }

  promptDelete(content: any) {
    this.modalService
      .open(content, { size: 'lg', scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          this.receivingSvc.delete(result).subscribe((res)=>{
            if (res.message === 'SUCCESS') {
              this.getData();
            }
          })
          console.log(result);
        },
        (reason) => {
          this.closeResult = this.getDismissReason(reason);
          console.log(this.closeResult);
        }
      );
  }

  promptComplete(content: any) {
    this.modalService
      .open(content, { size: 'lg', scrollable: true })
      .result.then(
        (result) => {
          //function di sini
          this.receivingSvc.complete(result).subscribe((res)=>{
            if (res.message === 'SUCCESS') {
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

}
