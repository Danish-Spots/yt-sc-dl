import { Component, inject } from '@angular/core';
import { YoutubeFacade } from '../../../../facades/yt-store.facade';
import { DownloadButtonComponent } from '../../../pure/download-button/download-button.component';

@Component({
  selector: 'app-youtube-download-button',
  templateUrl: './youtube-download-button.component.html',
  standalone: true,
  imports: [DownloadButtonComponent],
})
export class YoutubeDownloadButtonComponent {
  ytFacade = inject(YoutubeFacade);
  startDownload() {
    this.ytFacade.download();
  }
}
