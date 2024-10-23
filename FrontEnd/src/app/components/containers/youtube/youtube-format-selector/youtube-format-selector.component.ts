import { Component, inject } from '@angular/core';
import { YoutubeFacade } from '../../../../facades/yt-store.facade';
import { FormatSelectorComponent } from '../../../pure/format-selector/format-selector.component';

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
