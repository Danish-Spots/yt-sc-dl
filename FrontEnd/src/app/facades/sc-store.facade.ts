import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SoundcloudSelectors } from '../store/soundcloud-state/soundcloud.selectors';
import { SoundcloudActions } from '../store/soundcloud-state/soundcloud.actions';

@Injectable({
  providedIn: 'root',
})
export class ScFacade {
  private store = inject(Store);
  scPreviewImage$ = this.store.select(
    SoundcloudSelectors.selectPreviewDataImage
  );
  scMetadata$ = this.store.select(SoundcloudSelectors.selectInitialMetadata);
  scPreviewData$ = this.store.select(SoundcloudSelectors.selectPreviewDataData);
  thumbnails$ = this.store.select(SoundcloudSelectors.selectImages);
  scDataLoading$ = this.store.select(SoundcloudSelectors.selectLoadingData);
  scHideSteps$ = this.store.select(SoundcloudSelectors.selectHideSteps);
  scDownloading$ = this.store.select(SoundcloudSelectors.selectIsDownloading);
  scData$ = this.store.select(SoundcloudSelectors.selectData);

  addImage(imageUrl: string) {
    this.store.dispatch(SoundcloudActions.addImage({ imageUrl }));
  }
  changeSelectedImage(imageUrl: string) {
    this.store.dispatch(SoundcloudActions.setImage({ imageUrl }));
  }

  setUrl(url: string) {
    this.store.dispatch(SoundcloudActions.setUrl({ url }));
  }
  download() {
    this.store.dispatch(SoundcloudActions.downloadAudio());
  }
  setMetadata(
    event: Omit<import('../view-models/metadata').Metadata, 'image'>
  ) {
    this.store.dispatch(SoundcloudActions.setMetadata({ metadata: event }));
  }
}
