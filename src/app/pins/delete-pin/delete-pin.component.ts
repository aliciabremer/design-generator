import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../../core/data.service';
import { IPinFolder } from '../../shared/interfaces';

@Component({
  selector: 'app-delete-pin',
  templateUrl: './delete-pin.component.html',
  styleUrls: ['./delete-pin.component.css']
})
export class DeletePinComponent implements OnInit {

	folder:any;
	id:number = 0;

  constructor(private dataService: DataService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.id = +this.route.snapshot.paramMap.get('id')!;
  	console.log(this.id);

    this.dataService.getFolder(this.id)
            .subscribe((f: IPinFolder) => this.folder = f);
    console.log(this.folder);

  }

  delete():void {
  	this.dataService.deleteFolder(this.id);
  }

}
