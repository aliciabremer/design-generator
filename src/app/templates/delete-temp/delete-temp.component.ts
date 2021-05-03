import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../core/data.service';
import { ITemplate } from '../../shared/interfaces';

@Component({
  selector: 'app-delete-temp',
  templateUrl: './delete-temp.component.html',
  styleUrls: ['./delete-temp.component.css']
})
export class DeleteTempComponent implements OnInit {

	template:any;
	id:number = 0;

  constructor(private dataService: DataService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {

  	this.id = +this.route.snapshot.paramMap.get('id')!;
  	console.log(this.id);

    this.dataService.getTemplate(this.id)
            .subscribe((t: ITemplate) => this.template = t);
    console.log(this.template);
  }

  delete():void {
  	this.dataService.deleteTemplate(this.id);
  }

}
