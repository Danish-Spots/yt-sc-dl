import { createFeatureSelector, createSelector } from '@ngrx/store';
import { YoutubeState } from './youtube.state';

export const YOUTUBE_STATE_KEY = 'youtube-state';

export const selectYoutubeState =
  createFeatureSelector<YoutubeState>(YOUTUBE_STATE_KEY);

export const selectUrl = createSelector(
  selectYoutubeState,
  (state) => state.url
);
