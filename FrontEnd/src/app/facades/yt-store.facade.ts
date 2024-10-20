import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { YoutubeActions } from '../store/youtube-state/youtube.actions';
import {
  selectData,
  selectLoadingData,
  selectUrl,
} from '../store/youtube-state/youtube.selectors';
import { Observable } from 'rxjs';
import { UrlData } from '../view-models/url-data';

@Injectable({
  providedIn: 'root',
})
export class YoutubeFacade {
  store = inject(Store);
  ytData$ = this.store.select(selectData);
  ytDataLoading$ = this.store.select(selectLoadingData);

  setUrl(url: string): void {
    // Remove playlist from url\
    const replaceRegex = /\?list=[A-Za-z0-9]*/g;
    this.store.dispatch(
      YoutubeActions.setUrl({ url: url.replace(replaceRegex, '') })
    );
  }
}
