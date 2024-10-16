import { Routes } from '@angular/router';
import { AudioPanelComponent } from './components/audio-panel/audio-panel.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'yt-audio',
    component: AudioPanelComponent,
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
