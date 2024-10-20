import { UrlData } from '../../view-models/url-data';

export interface YoutubeState {
  url: string;
  data: UrlData | null;
  loadingData: boolean;
}

export const initialYoutubeState: YoutubeState = {
  url: '',
  data: null,
  loadingData: false,
};
