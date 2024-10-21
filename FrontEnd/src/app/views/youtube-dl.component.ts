import { Component, inject } from '@angular/core';
import { StepperComponent } from '../components/stepper/stepper.component';
import { YoutubeUrlComponent } from '../components/containers/youtube-url/youtube-url.component';
import { FetchComponent } from '../components/layouts/fetch/fetch.component';
import { LoadingComponent } from '../components/pure/loading/loading.component';
import { YoutubeDataComponent } from '../components/containers/youtube-data/youtube-data.component';
import { YoutubeFacade } from '../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';
import { MetadataComponent } from '../components/layouts/metadata/metadata.component';
import { YoutubeImageCropperComponent } from '../components/containers/youtube-image-cropper/youtube-image-cropper.component';
import { YoutubeMetadataFormComponent } from '../components/containers/youtube-metadata-form/youtube-metadata-form.component';
import { DownloadComponent } from '../components/layouts/download/download.component';
import { YoutubeFormatSelector } from '../components/containers/youtube-format-selector/youtube-format-selector.component';
import { YoutubePreviewComponent } from '../components/containers/youtube-preview/youtube-preview.component';
import { YoutubeDownloadButtonComponent } from '../components/containers/youtube-download-button/youtube-download-button.component';
import { NoDataComponent } from '../components/pure/no-data/no-data.component';

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
    YoutubePreviewComponent,
    YoutubeDownloadButtonComponent,
    NoDataComponent,
  ],
})
export class YoutubeDlComponent {
  ytFacade = inject(YoutubeFacade);
  loadingState$ = this.ytFacade.ytDataLoading$;
  hideSteps$ = this.ytFacade.ytHideSteps$;
}
