import { Component, inject } from '@angular/core';
import { YoutubeFacade } from '../../../../../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';
import { PreviewImageComponent } from '../../../../pure/preview/image/preview-image.component';

@Component({
  selector: 'app-youtube-preview-image',
  templateUrl: './youtube-preview-image.component.html',
  standalone: true,
  imports: [PreviewImageComponent, AsyncPipe],
})
export class YoutubePreviewImageComponent {
  ytFacade = inject(YoutubeFacade);
  image$ = this.ytFacade.ytPreviewImage$;
}
