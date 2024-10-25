import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class SidebarComponent {
  constructor(private router: Router) {}

  routeToAudioDl(drawer: MatDrawer) {
    this.router.navigateByUrl('/yt-audio');
    drawer.toggle();
  }

  routeToSoundcloudDl(drawer: MatDrawer) {
    this.router.navigateByUrl('/sc-audio');
    drawer.toggle();
  }
  routeToSettings(drawer: MatDrawer) {
    this.router.navigateByUrl('/settings');
    drawer.toggle();
  }

  routeToHome() {
    this.router.navigateByUrl('/');
  }
}
