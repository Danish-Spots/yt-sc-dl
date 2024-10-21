import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { YoutubeActions } from '../store/youtube-state/youtube.actions';
import {
  selectData,
  selectHideSteps,
  selectInitialMetadata,
  selectIsDownloading,
  selectLoadingData,
  selectMetadata,
  selectPreviewData,
  selectPreviewDataData,
  selectPreviewDataImage,
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
  ytPreviewData$ = this.store.select(selectPreviewDataData);
  ytPreviewImage$ = this.store.select(selectPreviewDataImage);
  ytHideSteps$ = this.store.select(selectHideSteps);
  ytDownloading$ = this.store.select(selectIsDownloading);

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

  setFormat(format: string) {
    this.store.dispatch(YoutubeActions.setFormat({ format }));
  }

  download() {
    this.store.dispatch(YoutubeActions.downloadAudio());
  }
}
