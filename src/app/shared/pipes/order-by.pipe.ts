import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: object[], field: string, ascOrder: boolean): object[] {
    return value.sort(
      (o1: object, o2: object): number => {
        if (ascOrder) {
          return o1[field] > o2[field] ? 1 : -1;
        } else {
          return o1[field] > o2[field] ? -1 : 1;
        }
      }
    );
  }
}
