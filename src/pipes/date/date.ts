import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({name: 'daterange'})
export class DateRangePipe implements PipeTransform {
  transform(items: any[], from: any, to: any) : any {

    if (!items || items.length==0 || ((!to || to==='' || to===undefined) && (!from || from==='' || from===undefined)) ) {
      return items;
    }

    if(!from || from==='' || from===undefined){
      from = new Date(moment(moment()).startOf('day').format());
  }

    if(!to || to==='' || to===undefined){
        to = new Date(moment(moment()).endOf('day').format());
    }

    from = new Date(moment(new Date(from)).local().startOf('day').format());
    to = new Date(moment(new Date(to)).local().endOf('day').format());

    // console.log(new Date(from));
    // console.log(new Date(items[3].date));
    // console.log(new Date(to));
    return items.filter(item =>  new Date(item.date) >= from && new Date(item.date) <=  to);
  }
}