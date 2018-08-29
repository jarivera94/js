import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'initialCharts'
})

export class InitialChartsPipe implements PipeTransform {
    transform(value: string): string {
        if(value) {       
          return value.substring(0,1);
        }
        return '';
    }
}