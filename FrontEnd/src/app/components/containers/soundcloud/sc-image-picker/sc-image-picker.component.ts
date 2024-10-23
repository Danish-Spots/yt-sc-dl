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

  imageChanged(event: string) {
    this.scFacade.changeSelectedImage(event);
  }
  addImage(event: string) {
    this.scFacade.addImage(event);
  }
}
