import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, catchError, filter, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';

@Component({
  selector: 'app-audio-panel',
  templateUrl: './audio-panel.component.html',
  styleUrl: './audio-panel.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    JsonPipe,
    NgOptimizedImage,
    AsyncPipe,
    MatProgressBarModule,
    MatSelectModule,
    ImageCropperComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPanelComponent implements OnInit {
  FormControl = new FormControl('', [this.verifyUrl]);
  loadingMetadata$ = new BehaviorSubject(false);
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

  data!: any;

  constructor(
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ) {}

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

  getData() {
    if (!this.FormControl.value) return;
    this.loadingMetadata$.next(true);
    this.apiService
      .GetMetadata(this.FormControl.value)
      .pipe(
        catchError((err) => {
          this.loadingMetadata$.next(false);
          return err;
        })
      )
      .subscribe((val) => {
        this.data = val;
        this.loadingMetadata$.next(false);
        this.cdRef.markForCheck();
      });
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
