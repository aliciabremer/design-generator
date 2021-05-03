import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { IPinFolder } from '../../shared/interfaces';
import { SorterService } from '../../core/sorter.service';

@Component({
  selector: 'app-pins-list',
  templateUrl: './pins-list.component.html',
  styleUrls: ['./pins-list.component.css']
})
export class PinsListComponent implements OnInit {

	@Output() createNew = new EventEmitter<boolean>();

  private _folders: IPinFolder[] = [];
    @Input() get folders(): IPinFolder[] {
        return this._folders;
    }

    set folders(value: IPinFolder[]) {
        if (value) {
            this.filteredFolders = this._folders = value;
        }
    }

    filteredFolders: any[] = [];

  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
  }

  filter(data: string) {
  	
        if (data) {
            this.filteredFolders = this.folders.filter((f: IPinFolder) => {
                return f.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       f.dateCreated.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       f.dateLastUsed.toString().indexOf(data) > -1 ||
                       f.categories.toString().indexOf(data) > -1;
            });
        } else {
            this.filteredFolders = this.folders;
        }
    }

  sort(prop: string) {
  		console.log("sorting");
        this.sorterService.sort(this.filteredFolders, prop);
    }

    create()
    {
      this.createNew.emit(true);
    }

}
