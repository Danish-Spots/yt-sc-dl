import {
  Component,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropperComponent {
  cropper!: Cropper;

  @ViewChild('#image')
  imageElement!: HTMLImageElement;

  // Input setter to detect changes in base64Image
  @Input() set base64Image(value: string) {
    console.log(value, 'test');
    if (value) {
      this._base64Image = value;
      // Initialize the cropper when the image is updated
      if (this.imageElement) {
        this.initializeCropper();
      }
    }
  }

  _base64Image!: string;

  constructor(private cdr: ChangeDetectorRef) {}

  initializeCropper() {
    // Destroy the previous cropper instance if it exists
    if (this.cropper) {
      this.cropper.destroy();
    }

    // Initialize the cropper with the new image
    setTimeout(() => {
      this.cropper = new Cropper(this.imageElement, {
        aspectRatio: 1, // Crops to a square
        viewMode: 1,
        scalable: true,
        movable: true,
      });
      this.cdr.markForCheck();
    }, 0);
  }

  cropImage() {
    if (this.cropper) {
      const croppedCanvas = this.cropper.getCroppedCanvas({
        width: 500,
        height: 500,
      });

      croppedCanvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'cropped-image.png';
          link.click();
        }
      });
    }
  }
}
