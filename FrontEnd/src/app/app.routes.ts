import { Routes } from '@angular/router';
import { AudioPanelComponent } from './components/audio-panel/audio-panel.component';
import { HomeComponent } from './components/home/home.component';
import { YoutubeDlComponent } from './views/youtube-dl.component';

export const routes: Routes = [
  {
    path: 'yt-audio',
    component: YoutubeDlComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
