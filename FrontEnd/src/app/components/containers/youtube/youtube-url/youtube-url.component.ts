import { Component } from '@angular/core';
import { UrlComponent } from '../../../pure/url/url.component';
import { YoutubeFacade } from '../../../../facades/yt-store.facade';

@Component({
  selector: 'app-youtube-url',
  templateUrl: './youtube-url.component.html',
  standalone: true,
  imports: [UrlComponent],
})
export class YoutubeUrlComponent {
  youtubeRegex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  cleanYtUrlRegex = /&list=[A-Za-z0-9&_=]*/g;
  constructor(private youtubeFacade: YoutubeFacade) {}

  setUrl(url: string | undefined): void {
    if (!url) return;

    this.youtubeFacade.setUrl(url.replace(this.cleanYtUrlRegex, ''));
  }
}
