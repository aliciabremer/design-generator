import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SorterService 
{

  property: string = "";
	direction: number = 1;

  /**
   * Sort a list of data based on the propery inputted. 
   *
   * @param collection - the list to sort
   * @param prop - the property to sort by
   * @returns void
   */
  sort(collection: any[], prop: any) : void
  {
    this.property = prop;
    this.direction = (this.property === prop) ? this.direction * -1 : 1;

    collection.sort((a: any,b: any) => {
      let aVal: any;
      let bVal: any;
            
      //Handle resolving complex properties such as 'state.name' for prop value
      if (prop && prop.indexOf('.') > -1) 
      {
        aVal = this.resolveProperty(prop, a);
        bVal = this.resolveProperty(prop, b);
      }
      else 
      {            
        aVal = a[prop];
        bVal = b[prop];
      }
            
      //Fix issues that spaces before/after string value can cause such as ' San Francisco'
      if (this.isString(aVal)) aVal = aVal.trim().toUpperCase();
      if (this.isString(bVal)) bVal = bVal.trim().toUpperCase();
          
      if(aVal === bVal)
      {
        return 0;
      }
      else if (aVal > bVal)
      {
        return this.direction * -1; //change direction if the first value is greater than the second value
      }
      else 
      {
        return this.direction * 1;  //maintain the same direction if the first value is less than the second value
      }
        
    });
  }
    
    
  /**
   * Check if the value inputted is a string
   *
   * @param val - the object to check if it is a string
   * @returns true if the value is a string; false otherwse
   */
  isString(val: any) : boolean 
  {
      return (val && (typeof val === 'string' || val instanceof String));
  }

  /**
   * Fix complex properties with . in them.
   *
   * @param path - the string to resolve
   * @param obj - the object being sorted
   * @returns void
   */
  resolveProperty(path: string, obj: any) :void
  {
    return path.split('.').reduce(function(prev, curr) {
        return (prev ? prev[curr] : undefined)
    }, obj || self);
  }
}
