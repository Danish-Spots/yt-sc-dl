import { Component, inject } from '@angular/core';
import { ImageCropperComponent } from '../../pure/image-cropper/image-cropper.component';
import { YoutubeFacade } from '../../../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-youtube-image-cropper',
  templateUrl: './youtube-image-cropper.component.html',
  standalone: true,
  imports: [ImageCropperComponent, AsyncPipe],
})
export class YoutubeImageCropperComponent {
  ytFacade = inject(YoutubeFacade);

  thumbnail$ = this.ytFacade.ytThumbnail$;

  handleImageCroppedEvent(imageString: string) {
    this.ytFacade.setCroppedImage(imageString);
  }
}
