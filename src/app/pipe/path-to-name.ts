import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pathToName' })
export class PathToNamePipe implements PipeTransform {
  transform(path: any): string {
    return path.substr(path.lastIndexOf('/') + 1, path.length);
  }
}
