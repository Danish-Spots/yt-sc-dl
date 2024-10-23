import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  standalone: true,
})
export class ImageComponent {
  @Input() imageUrl!: string;

  naturalWidth!: string;
  naturalHeight!: string;

  imageLoaded(image: HTMLImageElement) {
    this.naturalHeight = image.naturalHeight.toString();
    this.naturalWidth = image.naturalWidth.toString();
  }
}
