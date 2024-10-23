import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PreviewDataComponent } from '../../../../pure/preview/data/preview-data.component';
import { YoutubeFacade } from '../../../../../facades/yt-store.facade';

@Component({
  selector: 'app-youtube-preview-data',
  templateUrl: './youtube-preview-data.component.html',
  standalone: true,
  imports: [PreviewDataComponent, AsyncPipe],
})
export class YoutubePreviewDataComponent {
  ytFacade = inject(YoutubeFacade);
  metadata$ = this.ytFacade.ytPreviewData$;
}
