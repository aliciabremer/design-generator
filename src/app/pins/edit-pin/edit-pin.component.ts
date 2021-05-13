import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { DataService } from '../../core/data.service';
import { IPinFolder, IUser } from '../../shared/interfaces';


@Component({
  selector: 'app-edit-pin',
  templateUrl: './edit-pin.component.html',
  styleUrls: ['./edit-pin.component.css']
})
export class EditPinComponent implements OnInit {

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

  constructor(private dataService:DataService,
  	private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
  	this.id = +this.route.snapshot.paramMap.get('id')!;
  	console.log(this.id);

    this.dataService.getFolder(this.id)
            .subscribe((f: IPinFolder) => this.folder = f);
    console.log(this.folder);

    this.dataService.getUser(this.folder.customerId)
            .subscribe((u: IUser) => this.user = u);
    console.log(this.user);
  }

  changePreferences():void {
  	console.log(this.folder);
	  this.dataService.changeFolder(this.folder).subscribe((f: IPinFolder) => this.folder = f);
  }

  trackByIndex(indexOfElement: number, obj: any):any {
    return indexOfElement;
  }

  addCategory():void
  {
  	this.folder.categories.push("");
  }

  removeCategory(index:number):void
  {
  	this.folder.categories.splice(index, 1);
  }

  addText(textType:number):void
  {
  	this.folder.text[textType].push("");
  }

  removeText(textType:number, index:number):void
  {
  	this.folder.text[textType].splice(index, 1);
  }

  addImage(src:string):void
  {
  	this.folder.image.push(src);
  	console.log(this.folder.image);
  }

}

//change how iamges are stored + fix images
