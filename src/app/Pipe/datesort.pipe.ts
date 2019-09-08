import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../Model/Task';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'datesort'
})
export class DateSortPipe implements PipeTransform {

    constructor(private _datePipe: DatePipe) { }

    transform(array: any[], field: string): any[] {
        array.sort((a: any, b: any) => {
            if (this._datePipe.transform(a[field], 'yyyy-MM-dd') > this._datePipe.transform(b[field], 'yyyy-MM-dd')) {
                return 1;
            }
            if (this._datePipe.transform(a[field], 'yyyy-MM-dd') < this._datePipe.transform(b[field], 'yyyy-MM-dd')) {
                return -1;
            }
            return 0;
        });
        return array;
    }

}