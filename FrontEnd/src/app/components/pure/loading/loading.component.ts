import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingEnum } from '../../../enums/loading.enum';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  standalone: true,
  imports: [MatProgressBarModule],
})
export class LoadingComponent {
  @Input({ required: true }) loadingState!: LoadingEnum | null;

  loadingEnum = LoadingEnum;
}
