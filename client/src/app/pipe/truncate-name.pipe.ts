import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true
})
export class TruncateNamePipe implements PipeTransform {

  transform(value: string, limit: number = 10): string {
    const truncated = value.split(' ')[0];
    if(!value) return '';
    if(truncated.length > limit){
      truncated.slice(0, limit) + '...';
    }
    return truncated;
  }

}
