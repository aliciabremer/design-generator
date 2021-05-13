import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DataService } from '../core/data.service';
import { IPinFolder, ITemplate } from '../shared/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fol:any[] = [];
  temps:any[] = [];
  num:number;
  id:number;

  selectedF:any[] = [];
  selectedT:any[] = [];

  doGenerate: boolean;

  constructor(private dataService: DataService,
    private router: Router) {

  		this.id = 1;
  		this.doGenerate = false;
  		this.num = 0;
    }

  ngOnInit(): void {

  	this.dataService.getFolders(this.id)
            .subscribe((folders: IPinFolder[]) => this.fol = folders);
    console.log(this.fol);

    this.dataService.getTemplates(this.id)
            .subscribe((t: ITemplate[]) => this.temps = t);
    console.log(this.temps);

  }

  //fix list selection stuff....

  addFolder(f : IPinFolder) : void
  {
  	this.selectedF.push(f);
  }
  
  addTemplate(t : ITemplate) : void
  {
  	this.selectedT.push(t);
  }

  selectAllPins():void
  {
  	this.selectedF = this.fol;
    console.log("selected all pins");
  }

  selectAllTemp() : void
  {
  	this.selectedT = this.temps;
    console.log("selected all templates");
  }

  getNumber(event: any) : void
  {
    this.num = event.target.valueAsNumber;
  }

  generate() : void
  {
  	this.doGenerate = true;
  }

  done() : void
  {
  	this.doGenerate = false;
  }


}
