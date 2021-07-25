import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-fonts',
  templateUrl: './filter-fonts.component.html',
  styleUrls: ['./filter-fonts.component.css']
})
export class FilterFontsComponent 
{

  //string to filter list by
  private _filter: string = "";

  /**
   * Get the value of the string to filter by
   * 
   * @returns the string to filter by
   */
  @Input() get filter() 
  {
    return this._filter;
  }

  /**
   * Take the string to filter the list, assign it to _filter and emit filter.
   * 
   * @param val - the string to filter by
   * @returns void
   */
  set filter(val: string) 
  { 
    this._filter = val;
    this.changed.emit(this.filter); //Raise changed event
  }

  //output the string to filter by
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

}
