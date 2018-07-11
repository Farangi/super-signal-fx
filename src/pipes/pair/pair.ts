import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pairfilter'})
export class PairFilterPipe implements PipeTransform {
  transform(items: any[], filter: any) : any {
    if (!items || !filter || items.length==0 || filter.name==='' || filter.name==='NONE' || filter.name===undefined) {
      return items;
    }

    return items.filter(item => item.asset === filter.name);
  }
}