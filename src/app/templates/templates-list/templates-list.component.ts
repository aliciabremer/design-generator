import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ITemplate } from '../../shared/interfaces';
import { SorterService } from '../../core/sorter.service';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css']
})
export class TemplatesListComponent implements OnInit {

	@Output() createNew = new EventEmitter<boolean>();

	private _templates: ITemplate[] = [];
    @Input() get templates(): ITemplate[] {
        return this._templates;
    }

    set templates(value: ITemplate[]) {
        if (value) {
            this.filteredTemplates = this._templates = value;
        }
    }

	filteredTemplates: any[] = [];

  constructor(private sorterService:SorterService) { 
 }

  ngOnInit(): void {
  }

  filter(data: string) {
    
        if (data) {
            this.filteredTemplates = this.templates.filter((f: ITemplate) => {
                return f.name.toLowerCase().indexOf(data.toLowerCase()) > -1
            });
        } else {
            this.filteredTemplates = this.templates;
        }
    }

    sort(prop: string) {
      console.log("sorting");
        this.sorterService.sort(this.filteredTemplates, prop);
    }

    create()
    {
    	this.createNew.emit(true);
    }


}
