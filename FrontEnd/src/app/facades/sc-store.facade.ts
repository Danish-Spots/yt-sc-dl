import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SoundcloudSelectors } from '../store/soundcloud-state/soundcloud.selectors';
import { SoundcloudActions } from '../store/soundcloud-state/soundcloud.actions';

@Injectable({
  providedIn: 'root',
})
export class ScFacade {
  private store = inject(Store);
  thumbnails$ = this.store.select(SoundcloudSelectors.selectImages);

  addImage(imageUrl: string) {
    this.store.dispatch(SoundcloudActions.addImage({ imageUrl }));
  }
  changeSelectedImage(imageUrl: string) {
    this.store.dispatch(SoundcloudActions.setImage({ imageUrl }));
  }
}
