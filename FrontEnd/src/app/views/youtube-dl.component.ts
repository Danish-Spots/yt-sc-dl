import { Component, inject } from '@angular/core';
import { StepperComponent } from '../components/stepper/stepper.component';
import { YoutubeUrlComponent } from '../components/containers/youtube-url/youtube-url.component';
import { FetchComponent } from '../components/layouts/fetch/fetch.component';
import { LoadingComponent } from '../components/pure/loading/loading.component';
import { YoutubeDataComponent } from '../components/containers/youtube-data/youtube-data.component';
import { YoutubeFacade } from '../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';

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
  ],
})
export class YoutubeDlComponent {
  ytFacade = inject(YoutubeFacade);
  loading$ = this.ytFacade.ytDataLoading$;
}
