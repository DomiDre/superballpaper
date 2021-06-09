import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'callbackFilter'
})
export class CallbackFilterPipe implements PipeTransform {

  transform(items: any[], callback: (item: any, callbackArgs?: any[]) => boolean, callbackArgs?: any[]): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => callback(item, callbackArgs));
  }

}
