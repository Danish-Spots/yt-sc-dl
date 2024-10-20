import { createFeatureSelector, createSelector } from '@ngrx/store';
import { YoutubeState } from './youtube.state';
import { Metadata } from '../../view-models/metadata';

export const YOUTUBE_STATE_KEY = 'youtube-state';

export const selectYoutubeState =
  createFeatureSelector<YoutubeState>(YOUTUBE_STATE_KEY);

export const selectUrl = createSelector(
  selectYoutubeState,
  (state) => state.url
);

export const selectLoadingData = createSelector(
  selectYoutubeState,
  (state) => state.loadingData
);
export const selectData = createSelector(
  selectYoutubeState,
  (state) => state.data
);

export const selectThumbnail = createSelector(
  selectData,
  (state) => state?.image
);

export const selectInitialMetadata = createSelector(
  selectData,
  (state): Omit<Metadata, 'image'> => ({
    title: state?.title,
    album: state?.title,
    artist: state?.artist,
  })
);
