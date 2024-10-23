import { Component, inject } from '@angular/core';
import { YoutubeFacade } from '../../../../facades/yt-store.facade';
import { DownloadButtonComponent } from '../../../pure/download-button/download-button.component';
import { ScFacade } from '../../../../facades/sc-store.facade';

@Component({
  selector: 'app-sc-download-button',
  templateUrl: './sc-download-button.component.html',
  standalone: true,
  imports: [DownloadButtonComponent],
})
export class ScDownloadButtonComponent {
  scFacade = inject(ScFacade);
  startDownload() {
    this.scFacade.download();
  }
}
