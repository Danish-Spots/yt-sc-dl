import { Component, Input } from '@angular/core';
import { Metadata } from '../../../view-models/metadata';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  standalone: true,
})
export class PreviewComponent {
  @Input() metadata!: Metadata;
}
