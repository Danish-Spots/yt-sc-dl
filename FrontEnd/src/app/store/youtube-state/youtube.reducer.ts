import { createReducer, on } from '@ngrx/store';
import { initialYoutubeState, YoutubeState } from './youtube.state';
import { YoutubeActions } from './youtube.actions';

export const youtubeReducer = createReducer(
  initialYoutubeState,
  on(
    YoutubeActions.setUrl,
    (state: YoutubeState, { url }: { url: string }): YoutubeState => ({
      ...state,
      url,
      data: null,
      loadingData: true,
    })
  ),
  on(YoutubeActions.setData, (state: YoutubeState, { data }) => ({
    ...state,
    data,
    loadingData: false,
  })),
  on(YoutubeActions.errorFetchingData, (state: YoutubeState) => ({
    ...state,
    loadingData: false,
  }))
);
