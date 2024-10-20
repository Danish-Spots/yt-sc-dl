import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { YoutubeActions } from '../store/youtube-state/youtube.actions';

@Injectable({
  providedIn: 'root',
})
export class YoutubeFacade {
  constructor(private store: Store) {}

  setUrl(url: string): void {
    // Remove playlist from url\
    const replaceRegex = /\?list=[A-Za-z0-9]*/g;
    this.store.dispatch(
      YoutubeActions.setUrl({ url: url.replace(replaceRegex, '') })
    );
  }
}
