import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-audio-panel',
  templateUrl: './audio-panel.component.html',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
})
export class AudioPanelComponent implements OnInit {
  FormControl = new FormControl('', [this.verifyUrl]);

  audioFormats = [
    'best',
    'aac',
    'alac',
    'flac',
    'm4a',
    'mp3',
    'opus',
    'vorbis',
    'wav',
  ];
  ngOnInit(): void {
    this.FormControl.statusChanges
      .pipe(
        filter((status) => status === 'VALID'),
        tap(() => {
          console.log(this.FormControl.value);
        })
      )
      .subscribe();
  }

  private verifyUrl(control: AbstractControl) {
    // Regular expression to match different YouTube URL formats, including shorts
    const regExp =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
    const match = control.value.match(regExp);
    return match && match[1]
      ? null
      : {
          InvalidUrl: 'Invalid url error',
        };
  }
}
