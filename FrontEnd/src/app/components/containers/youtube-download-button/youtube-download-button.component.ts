import { Component } from '@angular/core';
import { DownloadButtonComponent } from '../../pure/download-button/download-button.component';

@Component({
  selector: 'app-youtube-download-button',
  templateUrl: './youtube-download-button.component.html',
  standalone: true,
  imports: [DownloadButtonComponent],
})
export class YoutubeDownloadButtonComponent {
  startDownload() {}
}
