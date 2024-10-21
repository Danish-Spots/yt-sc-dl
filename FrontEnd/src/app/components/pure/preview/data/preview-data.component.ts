import { Component, Input } from '@angular/core';
import { Metadata } from '../../../../view-models/metadata';

@Component({
  selector: 'app-preview-data',
  templateUrl: './preview-data.component.html',
  styleUrl: './preview-data.component.scss',
  standalone: true,
})
export class PreviewDataComponent {
  @Input() metadata!: Omit<Metadata, 'image'> | null;
}
