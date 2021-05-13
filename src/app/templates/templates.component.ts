import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../core/data.service';
import { ITemplate, IRectangle, ICircle, IText, IImage } from '../shared/interfaces';
import { SorterService } from '../core/sorter.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

	templates:any[]=[];
	id:number;

  newT:ITemplate = {
      "id": 0,
      "customerId": "0",
      "dateCreated":"2021-03-21",
      "name": "",
      "width": 1000,
      "height": 1500,
      "shapes":[[0, 0]],
      "rectangles": [],
      "circles": [],
      "texts": [],
      "images": []
    };

  constructor(private dataService:DataService,
    private router: Router) { 
  	this.id = 1;
  }

  ngOnInit(): void {

  	this.dataService.getTemplates(this.id)
            .subscribe((temps: ITemplate[]) => this.templates = temps);
    console.log(this.templates);
  }

  onNew(createNew: boolean): void {
    
      this.dataService.addTemplate(this.id)
        .subscribe((temps: ITemplate) => this.newT = temps);
      console.log(this.newT.id);
      this.router.navigate(['/', 'templates', this.newT.id]);
  }

}
