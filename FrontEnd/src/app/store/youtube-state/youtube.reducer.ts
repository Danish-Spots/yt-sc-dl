import { createReducer, on } from '@ngrx/store';
import { initialYoutubeState, YoutubeState } from './youtube.state';
import { YoutubeActions } from './youtube.actions';
import { LoadingEnum } from '../../enums/loading.enum';

export const youtubeReducer = createReducer(
  initialYoutubeState,
  on(
    YoutubeActions.setUrl,
    (state: YoutubeState, { url }: { url: string }): YoutubeState => ({
      ...state,
      url,
      data: null,
      loadingData: LoadingEnum.loading,
    })
  ),
  on(YoutubeActions.setData, (state: YoutubeState, { data }) => ({
    ...state,
    data,
    loadingData: LoadingEnum.loaded,
  })),
  on(YoutubeActions.errorFetchingData, (state: YoutubeState) => ({
    ...state,
    loadingData: LoadingEnum.notLoaded,
  })),
  on(YoutubeActions.setCroppedImage, (state, { imageString }) => ({
    ...state,
    metadata: {
      ...state.metadata,
      image: imageString,
    },
  })),
  on(YoutubeActions.setMetadata, (state, { metadata }) => ({
    ...state,
    metadata: {
      ...state.metadata,
      ...metadata,
    },
  })),
  on(YoutubeActions.setFormat, (state, { format }) => ({
    ...state,
    selectedFormat: format,
  })),
  on(YoutubeActions.downloadAudio, (state) => ({
    ...state,
    downloadingFile: true,
  })),
  on(
    YoutubeActions.downloadError,
    YoutubeActions.downloadErrorDataPassedIncorrectly,
    (state) => ({
      ...state,
      downloadingFile: false,
    })
  ),
  on(YoutubeActions.downloadSuccess, (state) => initialYoutubeState)
);
