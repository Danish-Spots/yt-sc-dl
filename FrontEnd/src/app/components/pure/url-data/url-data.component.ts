import { Component, Input, input } from '@angular/core';
import { UrlData } from '../../../view-models/url-data';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-url-data',
  templateUrl: './url-data.component.html',
  styleUrl: './url-data.component.scss',
  standalone: true,
})
export class UrlDataComponent {
  @Input({ required: true }) data!: UrlData;
}
