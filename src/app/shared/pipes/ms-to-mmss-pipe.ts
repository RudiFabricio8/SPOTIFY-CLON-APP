import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToMmss',
  standalone: false
})
export class MsToMmssPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
