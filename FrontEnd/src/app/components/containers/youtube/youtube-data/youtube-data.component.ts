import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { YoutubeFacade } from '../../../../facades/yt-store.facade';
import { UrlData } from '../../../../view-models/url-data';
import { UrlDataComponent } from '../../../pure/url-data/url-data.component';

@Component({
  selector: 'app-youtube-data',
  templateUrl: './youtube-data.component.html',
  standalone: true,
  imports: [UrlDataComponent, AsyncPipe],
})
export class YoutubeDataComponent {
  ytFacade = inject(YoutubeFacade);
  data$: Observable<UrlData | null> = this.ytFacade.ytData$;
}
