import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrl: './preview-image.component.scss',
  standalone: true,
})
export class PreviewImageComponent {
  @Input() image!: string | null | undefined;
}
