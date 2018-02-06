import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectProps'
})
export class ObjectPropsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const answer = []

    const props = Object.keys(value);
    props.forEach( prop => {
      answer.push(prop);
    })
    return answer;
  }

}
