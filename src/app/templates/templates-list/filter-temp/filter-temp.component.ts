import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-temp',
  templateUrl: './filter-temp.component.html',
  styleUrls: ['./filter-temp.component.css']
})
export class FilterTempComponent implements OnInit {

  private _filter: string = "";
    @Input() get filter() {
        return this._filter;
    }
    
    set filter(val: string) { 
        this._filter = val;
        this.changed.emit(this.filter); //Raise changed event
    }

    @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
}
