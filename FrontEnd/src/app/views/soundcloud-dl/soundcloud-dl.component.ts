import { Component, inject } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { YoutubeUrlComponent } from '../../components/containers/youtube/youtube-url/youtube-url.component';
import { FetchComponent } from '../../components/layouts/fetch/fetch.component';
import { LoadingComponent } from '../../components/pure/loading/loading.component';
import { YoutubeFacade } from '../../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';
import { MetadataComponent } from '../../components/layouts/metadata/metadata.component';
import { DownloadComponent } from '../../components/layouts/download/download.component';
import { YoutubePreviewImageComponent } from '../../components/containers/youtube/youtube-preview/image/youtube-preview-image.component';
import { NoDataComponent } from '../../components/pure/no-data/no-data.component';
import { YoutubePreviewDataComponent } from '../../components/containers/youtube/youtube-preview/data/youtube-preview-data.component';
import {
  YoutubeDataComponent,
  YoutubeDownloadButtonComponent,
  YoutubeFormatSelector,
  YoutubeImageCropperComponent,
  YoutubeMetadataFormComponent,
} from '../../components/containers/youtube';
import { ScImagePickerComponent } from '../../components/containers/soundcloud';

@Component({
  selector: 'app-soundcloud-dl',
  templateUrl: './soundcloud-dl.component.html',
  styleUrl: './soundcloud-dl.component.scss',
  standalone: true,
  imports: [
    StepperComponent,
    YoutubeUrlComponent,
    FetchComponent,
    LoadingComponent,
    YoutubeDataComponent,
    AsyncPipe,
    MetadataComponent,
    YoutubeImageCropperComponent,
    YoutubeMetadataFormComponent,
    DownloadComponent,
    YoutubeFormatSelector,
    YoutubeDownloadButtonComponent,
    NoDataComponent,
    YoutubePreviewImageComponent,
    YoutubePreviewDataComponent,
    ScImagePickerComponent,
  ],
})
export class SoundcloudDlComponent {
  ytFacade = inject(YoutubeFacade);
  loadingState$ = this.ytFacade.ytDataLoading$;
  hideSteps$ = this.ytFacade.ytHideSteps$;
  downloading$ = this.ytFacade.ytDownloading$;
}
