import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../core/data.service';
import { IPinFolder } from '../shared/interfaces';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {

  f:any[] = [];
  id:number;

  newF:IPinFolder = {
      "id": 0,
      "customerId": 0,
      "name": "temporary",
      "dateCreated":"2021-03-21", //CHANGE TO GETTING DATE TODAY
      "dateLastUsed": "2021-03-21",
      "categories": [],
      "text":[],
       "image":[]
    };

  constructor(private dataService: DataService,
    private router: Router) { 
  	this.id = 1;
  }

  ngOnInit(): void {

  	this.dataService.getFolders(this.id)
            .subscribe((folders: IPinFolder[]) => this.f = folders);
    console.log(this.f);
  }

  onNew(createNew: boolean): void {
    /*
    if (createNew){
      var newFolder:IPinFolder = {
        "id": 0,
      "customerId": this.id,
      "name": "temporary",
      "dateCreated":"2021-03-21", //CHANGE TO GETTING DATE TODAY
      "dateLastUsed": "2021-03-21",
      "categories": [],
      "text":[],
       "image":[]
    };
    */
      console.log("creating a new folder");
      this.dataService.addFolder(this.id)
            .subscribe((f: IPinFolder) => this.newF = f);
      this.router.navigate(['/', 'folders', this.newF.id]);
      console.log(this.newF);
      console.log(this.newF.id);
    }

}
