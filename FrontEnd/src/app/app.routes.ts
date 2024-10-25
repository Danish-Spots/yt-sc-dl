import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { YoutubeDlComponent } from './views/youtube-dl/youtube-dl.component';
import { SoundcloudDlComponent } from './views/soundcloud-dl/soundcloud-dl.component';
import { SettingsComponent } from './views/settings/settings.component';

export const routes: Routes = [
  {
    path: 'yt-audio',
    component: YoutubeDlComponent,
  },
  {
    path: 'sc-audio',
    component: SoundcloudDlComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
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
