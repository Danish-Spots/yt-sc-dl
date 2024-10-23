import { Component, inject } from '@angular/core';
import { ImagePickerComponent } from '../../../pure/image-picker/image-picker.component';
import { ScFacade } from '../../../../facades/sc-store.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sc-image-picker',
  templateUrl: './sc-image-picker.component.html',
  standalone: true,
  imports: [ImagePickerComponent, AsyncPipe],
})
export class ScImagePickerComponent {
  scFacade = inject(ScFacade);

  images$ = this.scFacade.thumbnails$;

  images = [
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-mini.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-tiny.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-small.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-badge.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-t67x67.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-large.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-t300x300.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-crop.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-t500x500.jpg',
    'https://i1.sndcdn.com/artworks-TCtPzBSKxxm8Lxyo-k0s4bA-original.jpg',
  ];

  imageChanged(event: string) {
    this.scFacade.changeSelectedImage(event);
  }
  addImage(event: string) {
    this.scFacade.addImage(event);
  }
}
