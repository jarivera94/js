import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'opportunitiesFilter',
    pure: false
})
export class opportunityFilter implements PipeTransform {
    transform(items: any[], filter: Object): any {
        //console.log(items, filter);

       //console.log( items.filter(item => item.probability ) )



        if (!items || !filter) {
            return items;
        }
        return items.filter( item => item.salesStage.indexOf( filter ) !== -1 );       

        /*return items.filter(item => {
          return item.probability >= +minAge && item.probability <= +filter;
        });*/        
    }
}