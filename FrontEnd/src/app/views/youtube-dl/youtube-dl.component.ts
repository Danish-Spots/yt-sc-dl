import { Component, inject } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { FetchComponent } from '../../components/layouts/fetch/fetch.component';
import { LoadingComponent } from '../../components/pure/loading/loading.component';
import { YoutubeFacade } from '../../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';
import { MetadataComponent } from '../../components/layouts/metadata/metadata.component';
import { DownloadComponent } from '../../components/layouts/download/download.component';
import { NoDataComponent } from '../../components/pure/no-data/no-data.component';
import {
  YoutubeDataComponent,
  YoutubeImageCropperComponent,
  YoutubeMetadataFormComponent,
  YoutubeFormatSelector,
  YoutubeDownloadButtonComponent,
  YoutubePreviewDataComponent,
  YoutubePreviewImageComponent,
  YoutubeUrlComponent,
} from '../../components/containers/youtube';

@Component({
  selector: 'app-youtube-dl',
  templateUrl: './youtube-dl.component.html',
  styleUrl: './youtube-dl.component.scss',
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
  ],
})
export class YoutubeDlComponent {
  ytFacade = inject(YoutubeFacade);
  loadingState$ = this.ytFacade.ytDataLoading$;
  hideSteps$ = this.ytFacade.ytHideSteps$;
  downloading$ = this.ytFacade.ytDownloading$;
}
