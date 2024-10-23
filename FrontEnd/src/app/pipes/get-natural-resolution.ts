import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'naturalResolution',
})
export class GetNaturalResolutionPipe implements PipeTransform {
  transform(image: HTMLImageElement): string {
    console.log(image.naturalHeight);
    console.log(image.naturalWidth);
    return '';
  }
}
