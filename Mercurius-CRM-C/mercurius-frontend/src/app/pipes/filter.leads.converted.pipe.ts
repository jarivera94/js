import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'leadsConvertedFilter',
    pure: false
})
export class leadConvertedFilter implements PipeTransform {
    transform(items: any[], filter: Object): any {

        if (!items || !filter) {
            return items;
        }        
        return items.filter(item => item.converted.indexOf(filter) !== -1);
    }
}