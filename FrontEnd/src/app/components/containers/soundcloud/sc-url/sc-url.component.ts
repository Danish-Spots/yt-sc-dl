import { Component } from '@angular/core';
import { ScFacade } from '../../../../facades/sc-store.facade';
import { UrlComponent } from '../../../pure/url/url.component';

@Component({
  selector: 'app-sc-url',
  templateUrl: './sc-url.component.html',
  standalone: true,
  imports: [UrlComponent],
})
export class ScUrlComponent {
  soundcloudRegex =
    /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;
  constructor(private scFacade: ScFacade) {}

  setUrl(url: string | undefined): void {
    if (!url) return;

    this.scFacade.setUrl(url);
  }
}
