import { Component, inject } from '@angular/core';
import { UrlDataComponent } from '../../pure/url-data/url-data.component';
import { YoutubeFacade } from '../../../facades/yt-store.facade';
import { Observable } from 'rxjs';
import { UrlData } from '../../../view-models/url-data';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-youtube-data',
  templateUrl: './youtube-data.component.html',
  styleUrl: './youtube-data.component.scss',
  standalone: true,
  imports: [UrlDataComponent, AsyncPipe],
})
export class YoutubeDataComponent {
  ytFacade = inject(YoutubeFacade);
  data$: Observable<UrlData | null> = this.ytFacade.ytData$;
}
