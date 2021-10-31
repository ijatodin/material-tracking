import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  formData: any = {};
  projectData: any = [];

  constructor(
    private projectSvc: ProjectService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.projectSvc.getAll().subscribe((res) => {
      if (res.message === 'SUCCESS') {
        this.projectData = res.model;
      }
    })
  }

  submit() {
    this.projectSvc.storeProject(this.formData).subscribe((res) => {
      if (res.message === 'SUCCESS') {
        // console.log(res.model);
        this.formData = {};
        this.getData();
      }
    })
  }

}
