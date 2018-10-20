import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'idToName' })
export class IdToNamePipe implements PipeTransform {
    transform(id: string): string {
        return id.replace('Id', 'Name');
    }
}
