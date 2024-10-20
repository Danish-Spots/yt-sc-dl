import { LoadingEnum } from '../../enums/loading.enum';
import { UrlData } from '../../view-models/url-data';

export interface YoutubeState {
  url: string;
  data: UrlData | null;
  loadingData: LoadingEnum;
}

export const initialYoutubeState: YoutubeState = {
  url: '',
  data: null,
  loadingData: LoadingEnum.notLoaded,
};
