import { createFeatureSelector, createSelector } from '@ngrx/store';
import { YoutubeState } from './youtube.state';
import { Metadata } from '../../view-models/metadata';
import { LoadingEnum } from '../../enums/loading.enum';

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

export const selectHideSteps = createSelector(
  selectLoadingData,
  (loading) => loading !== LoadingEnum.loaded
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

export const selectMetadata = createSelector(
  selectYoutubeState,
  (state) => state.metadata
);

export const selectPreviewData = createSelector(
  selectMetadata,
  selectData,
  (metadata, data) => ({
    image: metadata.image ?? data?.image,
    artist: metadata.artist ?? data?.artist,
    album: metadata.album ?? data?.title,
    title: metadata.title ?? data?.title,
  })
);

export const selectFormat = createSelector(
  selectYoutubeState,
  (state) => state.selectedFormat
);

export const selectDownloadData = createSelector(
  selectUrl,
  selectPreviewData,
  selectFormat,
  (url, metadata, format) => ({
    url,
    metadata,
    format,
  })
);
