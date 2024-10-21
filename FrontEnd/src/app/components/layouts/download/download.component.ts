import { Component, Input } from '@angular/core';
import { NoDataComponent } from '../../pure/no-data/no-data.component';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
  standalone: true,
  imports: [NoDataComponent],
})
export class DownloadComponent {
  @Input() hideStep!: boolean | null;
}
