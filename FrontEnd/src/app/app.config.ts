import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { YOUTUBE_STATE_KEY } from './store/youtube-state/youtube.selectors';
import { youtubeReducer } from './store/youtube-state/youtube.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { YoutubeEffects } from './store/youtube-state/youtube.effects';
import { SoundcloudSelectors } from './store/soundcloud-state/soundcloud.selectors';
import { soundcloudReducer } from './store/soundcloud-state/soundcloud.reducer';
import { SoundcloudEffects } from './store/soundcloud-state/soundcloud.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(),
    provideState(YOUTUBE_STATE_KEY, youtubeReducer),
    provideState(SoundcloudSelectors.SOUNDCLOUD_STATE_KEY, soundcloudReducer),
    provideEffects(YoutubeEffects, SoundcloudEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
