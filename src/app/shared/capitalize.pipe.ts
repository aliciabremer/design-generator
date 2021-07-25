import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform 
{
  /**
   * Capitalize the first letter of a string.
   *
   * @param value - the value to capitalize
   * @returns void
   */
  transform(value: any) 
  {
    if (value) 
    {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
}