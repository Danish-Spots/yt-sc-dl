import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UrlData } from '../../../../view-models/url-data';
import { UrlDataComponent } from '../../../pure/url-data/url-data.component';
import { ScFacade } from '../../../../facades/sc-store.facade';

@Component({
  selector: 'app-sc-data',
  templateUrl: './sc-data.component.html',
  standalone: true,
  imports: [UrlDataComponent, AsyncPipe],
})
export class ScDataComponent {
  scFacade = inject(ScFacade);
  data$: Observable<UrlData | null> = this.scFacade.scData$;
}
