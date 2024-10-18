import { Component } from '@angular/core';
import { StepperComponent } from '../components/stepper/stepper.component';
import { YoutubeUrlComponent } from '../components/containers/youtube-url/youtube-url.component';

@Component({
  selector: 'app-youtube-dl',
  templateUrl: './youtube-dl.component.html',
  styleUrl: './youtube-dl.component.scss',
  standalone: true,
  imports: [StepperComponent, YoutubeUrlComponent],
})
export class YoutubeDlComponent {}
