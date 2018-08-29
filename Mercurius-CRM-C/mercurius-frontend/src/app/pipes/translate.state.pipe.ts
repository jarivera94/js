import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'translateState',
    pure: false
})
export class trasnlateStatePipe implements PipeTransform {
    transform(value, items): any {
    	//console.log(value, items)

        let itemTranslate = items.filter(item => item.name.indexOf(value) !== -1 );

        //console.log(itemTranslate[0].value);
		return itemTranslate[0].value;        
    }
}