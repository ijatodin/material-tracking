import { Component, OnInit } from '@angular/core';
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

  constructor(
    private receivingSvc: ReceivingService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  setDetails(data: any) {
    this.selectedReceiving = data;
    console.log(this.selectedReceiving);
  }

  getData() {
    this.receivingSvc.getReceiving().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.receivingData = res.model;
        console.log(this.receivingData);
      }
    })
  }

}
