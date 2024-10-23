import { Component, inject } from '@angular/core';
import { FormatSelectorComponent } from '../../pure/format-selector/format-selector.component';
import { YoutubeFacade } from '../../../facades/yt-store.facade';

@Component({
  selector: 'app-youtube-format-selector',
  templateUrl: './youtube-format-selector.component.html',
  standalone: true,
  imports: [FormatSelectorComponent],
})
export class YoutubeFormatSelector {
  ytFacade = inject(YoutubeFacade);
  availableFormats = ['best', 'flac', 'm4a', 'mp3', 'opus', 'vorbis', 'wav'];

  setFormat(format: string) {
    this.ytFacade.setFormat(format);
  }
}
