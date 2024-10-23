import { createReducer, on } from '@ngrx/store';
import { initialSoundcloudState, SoundcloudState } from './soundcloud.state';
import { SoundcloudActions } from './soundcloud.actions';
import { LoadingEnum } from '../../enums/loading.enum';

export const soundcloudReducer = createReducer(
  initialSoundcloudState,
  on(
    SoundcloudActions.setUrl,
    (state: SoundcloudState, { url }: { url: string }): SoundcloudState => ({
      ...state,
      url,
      data: null,
      metadata: {},

      loadingData: LoadingEnum.loading,
    })
  ),
  on(SoundcloudActions.setData, (state: SoundcloudState, { data }) => ({
    ...state,
    data,
    loadingData: LoadingEnum.loaded,
  })),
  on(SoundcloudActions.errorFetchingData, (state: SoundcloudState) => ({
    ...state,
    loadingData: LoadingEnum.notLoaded,
  })),
  on(SoundcloudActions.addImage, (state: SoundcloudState, { imageUrl }) => ({
    ...state,
    data: {
      title: state.data?.title ?? '',
      artist: state.data?.artist ?? '',
      image: state.data?.image ?? '',
      images: [...(state.data?.images ?? []), imageUrl],
    },
  })),
  on(SoundcloudActions.setImage, (state, { imageUrl }) => ({
    ...state,
    metadata: {
      ...state.metadata,
      image: imageUrl,
    },
  })),
  on(SoundcloudActions.setMetadata, (state, { metadata }) => ({
    ...state,
    metadata: {
      ...state.metadata,
      ...metadata,
    },
  })),
  on(SoundcloudActions.downloadAudio, (state) => ({
    ...state,
    downloadingFile: true,
  })),
  on(
    SoundcloudActions.downloadError,
    SoundcloudActions.downloadErrorDataPassedIncorrectly,
    (state) => ({
      ...state,
      downloadingFile: false,
    })
  ),
  on(SoundcloudActions.downloadSuccess, (state) => initialSoundcloudState)
);
