import { Component, inject } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { FetchComponent } from '../../components/layouts/fetch/fetch.component';
import { LoadingComponent } from '../../components/pure/loading/loading.component';
import { AsyncPipe } from '@angular/common';
import { MetadataComponent } from '../../components/layouts/metadata/metadata.component';
import { DownloadComponent } from '../../components/layouts/download/download.component';
import { NoDataComponent } from '../../components/pure/no-data/no-data.component';

import {
  ScDataComponent,
  ScDownloadButtonComponent,
  ScImagePickerComponent,
  ScMetadataFormComponent,
  ScPreviewDataComponent,
  ScPreviewImageComponent,
  ScUrlComponent,
} from '../../components/containers/soundcloud';
import { ScFacade } from '../../facades/sc-store.facade';

@Component({
  selector: 'app-soundcloud-dl',
  templateUrl: './soundcloud-dl.component.html',
  styleUrl: './soundcloud-dl.component.scss',
  standalone: true,
  imports: [
    StepperComponent,
    ScUrlComponent,
    FetchComponent,
    LoadingComponent,
    ScDataComponent,
    AsyncPipe,
    MetadataComponent,
    ScMetadataFormComponent,
    DownloadComponent,
    ScDownloadButtonComponent,
    NoDataComponent,
    ScPreviewImageComponent,
    ScPreviewDataComponent,
    ScImagePickerComponent,
  ],
})
export class SoundcloudDlComponent {
  scFacade = inject(ScFacade);
  loadingState$ = this.scFacade.scDataLoading$;
  hideSteps$ = this.scFacade.scHideSteps$;
  downloading$ = this.scFacade.scDownloading$;
}
