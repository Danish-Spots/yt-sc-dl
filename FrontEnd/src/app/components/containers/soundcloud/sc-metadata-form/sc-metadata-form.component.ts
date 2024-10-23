import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MetadataFormComponent } from '../../../pure/metadata-form/metadata-form.component';
import { YoutubeFacade } from '../../../../facades/yt-store.facade';
import { Metadata } from '../../../../view-models/metadata';
import { ScFacade } from '../../../../facades/sc-store.facade';

@Component({
  selector: 'app-sc-metadata-form',
  templateUrl: './sc-metadata-form.component.html',
  standalone: true,
  imports: [MetadataFormComponent, AsyncPipe],
})
export class ScMetadataFormComponent {
  scFacade = inject(ScFacade);
  initialMetadata$ = this.scFacade.scMetadata$;

  updateMetadata(event: Omit<Metadata, 'image'>) {
    this.scFacade.setMetadata(event);
  }
}
