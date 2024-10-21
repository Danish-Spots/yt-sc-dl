import { Component, Input } from '@angular/core';
import { NoDataComponent } from '../../pure/no-data/no-data.component';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  standalone: true,
  imports: [NoDataComponent],
})
export class MetadataComponent {
  @Input() hideStep!: boolean | null;
}
