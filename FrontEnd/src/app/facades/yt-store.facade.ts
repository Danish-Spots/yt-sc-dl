import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { YoutubeActions } from '../store/youtube-state/youtube.actions';
import {
  selectData,
  selectInitialMetadata,
  selectLoadingData,
  selectThumbnail,
} from '../store/youtube-state/youtube.selectors';
import { Metadata } from '../view-models/metadata';

@Injectable({
  providedIn: 'root',
})
export class YoutubeFacade {
  store = inject(Store);
  ytData$ = this.store.select(selectData);
  ytDataLoading$ = this.store.select(selectLoadingData);
  ytThumbnail$ = this.store.select(selectThumbnail);
  ytMetadata$ = this.store.select(selectInitialMetadata);

  setUrl(url: string): void {
    // Remove playlist from url\
    const replaceRegex = /\?list=[A-Za-z0-9]*/g;
    this.store.dispatch(
      YoutubeActions.setUrl({ url: url.replace(replaceRegex, '') })
    );
  }

  setCroppedImage(imageString: string): void {
    this.store.dispatch(YoutubeActions.setCroppedImage({ imageString }));
  }

  setMetadata(metadata: Omit<Metadata, 'image'>) {
    this.store.dispatch(YoutubeActions.setMetadata({ metadata }));
  }
}
