import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../Model/Task';

@Pipe({
  name: 'sortwithName'
})
export class SortPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {   
    array.sort((a: any, b: any) => {
        //console.log(a[field]);
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}