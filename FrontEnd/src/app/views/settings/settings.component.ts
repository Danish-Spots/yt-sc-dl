import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideBasePath } from '../../init/api-config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SettingsComponent implements OnInit {
  fb = inject(FormBuilder);

  settingsKey = 'basePath';

  settingsFrom = this.fb.group({
    basePath: [''],
  });

  ngOnInit(): void {
    this.readSettings();
  }

  writeSettings() {
    let basePath = this.settingsFrom.value.basePath ?? '';
    // Default apply http to start of base path
    basePath = this.addDefaultProtocol(basePath);
    localStorage.setItem(this.settingsKey, basePath);
    provideBasePath(basePath);
  }

  private readSettings() {
    let basePath = localStorage.getItem(this.settingsKey) ?? '';
    basePath = this.addDefaultProtocol(basePath);
    this.settingsFrom.patchValue({ basePath });
    provideBasePath(basePath);
  }

  private addDefaultProtocol(basePath: string): string {
    if (
      basePath &&
      !basePath.startsWith('http://') &&
      !basePath.startsWith('https://')
    )
      return (basePath = `http://${basePath}`);
    return basePath;
  }
}
