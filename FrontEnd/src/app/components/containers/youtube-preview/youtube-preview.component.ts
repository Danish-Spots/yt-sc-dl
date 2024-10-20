import { Component, inject } from '@angular/core';
import { PreviewComponent } from '../../pure/preview/preview.component';
import { YoutubeFacade } from '../../../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-youtube-preview',
  templateUrl: './youtube-preview.component.html',
  standalone: true,
  imports: [PreviewComponent, AsyncPipe],
})
export class YoutubePreviewComponent {
  ytFacade = inject(YoutubeFacade);
  metadata$ = this.ytFacade.ytPreview$;
}
