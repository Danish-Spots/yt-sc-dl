import { LoadingEnum } from '../../enums/loading.enum';
import { Metadata } from '../../view-models/metadata';
import { UrlData } from '../../view-models/url-data';

export interface SoundcloudState {
  url: string;
  data: UrlData | null;
  loadingData: LoadingEnum;
  metadata: Metadata;

  downloadingFile: boolean;
}

export const initialSoundcloudState: SoundcloudState = {
  url: '',
  data: null,
  loadingData: LoadingEnum.notLoaded,
  metadata: {},

  downloadingFile: false,
};
