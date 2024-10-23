import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PreviewDataComponent } from '../../../../pure/preview/data/preview-data.component';
import { ScFacade } from '../../../../../facades/sc-store.facade';

@Component({
  selector: 'app-sc-preview-data',
  templateUrl: './sc-preview-data.component.html',
  standalone: true,
  imports: [PreviewDataComponent, AsyncPipe],
})
export class ScPreviewDataComponent {
  scFacade = inject(ScFacade);
  metadata$ = this.scFacade.scPreviewData$;
}
