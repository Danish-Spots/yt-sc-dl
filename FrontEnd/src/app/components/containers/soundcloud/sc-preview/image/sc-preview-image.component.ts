import { Component, inject } from '@angular/core';
import { YoutubeFacade } from '../../../../../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';
import { PreviewImageComponent } from '../../../../pure/preview/image/preview-image.component';
import { ScFacade } from '../../../../../facades/sc-store.facade';

@Component({
  selector: 'app-sc-preview-image',
  templateUrl: './sc-preview-image.component.html',
  standalone: true,
  imports: [PreviewImageComponent, AsyncPipe],
})
export class ScPreviewImageComponent {
  scFacade = inject(ScFacade);
  image$ = this.scFacade.scPreviewImage$;
}
