import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Metadata } from '../../view-models/metadata';
import { LoadingEnum } from '../../enums/loading.enum';
import { SoundcloudState } from './soundcloud.state';

const SOUNDCLOUD_STATE_KEY = 'soundcloud-state';

const selectYoutubeState =
  createFeatureSelector<SoundcloudState>(SOUNDCLOUD_STATE_KEY);

const selectUrl = createSelector(selectYoutubeState, (state) => state.url);

const selectLoadingData = createSelector(
  selectYoutubeState,
  (state) => state.loadingData
);

const selectHideSteps = createSelector(
  selectLoadingData,
  (loading) => loading !== LoadingEnum.loaded
);
const selectData = createSelector(selectYoutubeState, (state) => state.data);

const selectThumbnail = createSelector(selectData, (state) => state?.image);

const selectInitialMetadata = createSelector(
  selectData,
  (state): Omit<Metadata, 'image'> => ({
    title: state?.title,
    album: state?.title,
    artist: state?.artist,
  })
);

const selectMetadata = createSelector(
  selectYoutubeState,
  (state) => state.metadata
);

const selectPreviewData = createSelector(
  selectMetadata,
  selectData,
  (metadata, data) => ({
    image: metadata.image ?? data?.image,
    artist: metadata.artist ?? data?.artist,
    album: metadata.album ?? data?.title,
    title: metadata.title ?? data?.title,
  })
);

const selectPreviewDataData = createSelector(
  selectPreviewData,
  ({ title, album, artist }) => ({ title, album, artist })
);
const selectPreviewDataImage = createSelector(
  selectPreviewData,
  (data) => data.image
);

const selectDownloadData = createSelector(
  selectUrl,
  selectPreviewData,
  (url, metadata) => ({
    url,
    metadata,
  })
);

const selectDownloading = createSelector(
  selectYoutubeState,
  (state) => state.downloadingFile
);

const selectIsDownloading = createSelector(
  selectLoadingData,
  selectDownloading,
  (loadingData, downloading) =>
    loadingData === LoadingEnum.loaded && downloading
      ? LoadingEnum.loading
      : LoadingEnum.notLoaded
);
const selectImages = createSelector(selectData, (data) => data?.images);

export const SoundcloudSelectors = {
  SOUNDCLOUD_STATE_KEY,
  selectYoutubeState,
  selectUrl,
  selectLoadingData,
  selectHideSteps,
  selectData,
  selectThumbnail,
  selectInitialMetadata,
  selectMetadata,
  selectPreviewData,
  selectPreviewDataData,
  selectPreviewDataImage,
  selectDownloadData,
  selectDownloading,
  selectIsDownloading,
  selectImages,
};
