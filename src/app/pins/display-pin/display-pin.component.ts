import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../core/data.service';
import { IPinFolder, IUser } from '../../shared/interfaces';

@Component({
  selector: 'app-display-pin',
  templateUrl: './display-pin.component.html',
  styleUrls: ['./display-pin.component.css']
})
export class DisplayPinComponent implements OnInit {

	folder:any = {
      "id": 0,
      "customerId": "0",
      "name": "temporary",
      "dateCreated":"2021-03-21", //CHANGE TO GETTING DATE TODAY
      "dateLastUsed": "2021-03-21",
      "categories": [],
      "text":[],
       "image":[]
     };
	id:number = 0;
  user:any = {
      "id": "0",
      "name": "",
      "email":"",
      "templateId": "0",
      "folderId": "0",
      "textType": [],
      "colours": [],
      "fonts": []
    };


  constructor(private dataService: DataService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.id = +this.route.snapshot.paramMap.get('id')!;
  	console.log(this.id);

    this.dataService.getFolder(this.id)
            .subscribe((f: IPinFolder) => this.folder = f);
    console.log(this.folder);

    this.dataService.getUser(this.folder.customerId)
            .subscribe((u: IUser) => this.user = u);
    console.log(this.folder);

  }

}

/*add to folders: board descriptions for pinterest users*/