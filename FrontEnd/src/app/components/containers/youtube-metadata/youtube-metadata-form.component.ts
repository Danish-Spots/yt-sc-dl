import { Component, inject } from '@angular/core';
import { MetadataFormComponent } from '../../pure/metadata-form/metadata-form.component';
import { YoutubeFacade } from '../../../facades/yt-store.facade';
import { AsyncPipe } from '@angular/common';
import { Metadata } from '../../../view-models/metadata';

@Component({
  selector: 'app-youtube-metadata-form',
  templateUrl: './youtube-metadata-form.component.html',
  standalone: true,
  imports: [MetadataFormComponent, AsyncPipe],
})
export class YoutubeMetadataFormComponent {
  ytFacade = inject(YoutubeFacade);
  initialMetadata$ = this.ytFacade.ytMetadata$;

  updateMetadata(event: Omit<Metadata, 'image'>) {
    this.ytFacade.setMetadata(event);
  }
}
