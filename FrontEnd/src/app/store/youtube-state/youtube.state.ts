import { LoadingEnum } from '../../enums/loading.enum';
import { Metadata } from '../../view-models/metadata';
import { UrlData } from '../../view-models/url-data';

export interface YoutubeState {
  url: string;
  data: UrlData | null;
  loadingData: LoadingEnum;
  metadata: Metadata;
  selectedFormat?: string;

  downloadingFile: boolean;
}

export const initialYoutubeState: YoutubeState = {
  url: '',
  data: null,
  loadingData: LoadingEnum.notLoaded,
  metadata: {},

  downloadingFile: false,
};
