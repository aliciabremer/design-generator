import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';

import { IPinFolder, ITemplate } from '../../shared/interfaces';
import { DrawService } from '../../core/draw.service';

@Component({
  selector: 'app-get-designs',
  templateUrl: './get-designs.component.html',
  styleUrls: ['./get-designs.component.css']
})
export class GetDesignsComponent implements OnInit {

	private _folders: IPinFolder[] = [];

    @Input() get folders(): IPinFolder[] {
        return this._folders;
    }

    set folders(value: IPinFolder[]) {
        if (value) {
            this._folders = value;
        }
    }

    private _templates: ITemplate[] = [];
	
    @Input() get templates(): ITemplate[] {
        return this._templates;
    }

    set templates(value: ITemplate[]) {
        if (value) {
            this._templates = value;
        }
    }

    private _num: number = 0;

    @Input() get num(): number {
        return this._num;
    }

    set num(value: number) {
        if (value) {
            this._num = value;
        }
    }

    numbers:number[][];

  constructor() { 
    this.numbers = [[]];
    console.log(this.folders);
    console.log(this.templates);
    
  }

  ngOnInit(): void {
  	//create random pairing of templates and folders [options: ]
    console.log(this.folders);
    console.log(this.templates);
    for (let i: number = 0; i < this.num; i++) {
            this.numbers[i] = [];
            this.numbers[i][0] = Math.floor(Math.random()*this.folders.length);
            this.numbers[i][1] = Math.floor(Math.random()*this.templates.length);
        }
    console.log(this.num);
    console.log(this.numbers);
  }

  download() : void
  {
  	//add output event emitter
  }

}
