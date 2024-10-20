import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  standalone: true,
  imports: [MatButtonModule],
})
export class DownloadButtonComponent {
  @Output() downloadClicked = new EventEmitter<void>();
  download() {
    this.downloadClicked.emit();
  }
}
