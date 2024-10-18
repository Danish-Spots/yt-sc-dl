import { Component } from '@angular/core';
import { UrlComponent } from '../../pure/url/url.component';
import { Store } from '@ngrx/store';
import { YoutubeActions } from '../../../store/youtube-state/youtube.actions';

@Component({
  selector: 'app-youtube-url',
  templateUrl: './youtube-url.component.html',
  styleUrl: './youtube-url.component.scss',
  standalone: true,
  imports: [UrlComponent],
})
export class YoutubeUrlComponent {
  youtubeRegex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;

  constructor(private store: Store) {}

  setUrl(url: string | undefined): void {
    // handle url emission (probably store in state)
    if (!url) return;
    this.store.dispatch(YoutubeActions.setUrl({ url }));
  }
}
