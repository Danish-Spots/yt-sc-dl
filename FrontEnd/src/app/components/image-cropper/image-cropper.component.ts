import { M } from '@angular/cdk/keycodes';
import {
  Component,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  ChangeDetectionStrategy,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
  viewChild,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import 'cropperjs';
import Cropper, { CropperImage, CropperSelection } from 'cropperjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  imports: [MatButtonModule, MatIconModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropperComponent {
  cropper!: Cropper;
  cropperSelection!: CropperSelection | null;
  cropperImage!: CropperImage | null;
  imageSize!: number;

  // Input setter to detect changes in base64Image
  @Input() set base64Image(value: string) {
    if (value) {
      this._base64Image = value;
      // Initialize the cropper when the image is updated
      this.initializeCropper();
    }
  }

  _base64Image!: string;

  constructor(private cdr: ChangeDetectorRef) {}

  initializeCropper() {
    const image = new Image();
    image.src = this._base64Image;
    image.alt = 'Picture';

    this.cropper = new Cropper(image, {
      container: '.cropper-container',
      template: cropperTemplate,
    });

    this.cropperImage = this.cropper.getCropperImage();
    this.cropperSelection = this.cropper.getCropperSelection();
    if (this.cropperImage)
      this.cropperImage.$ready((image: HTMLImageElement) => {
        this.imageSize =
          image.naturalWidth > image.naturalHeight
            ? image.naturalHeight
            : image.naturalWidth;

        const canvas = document.querySelector('cropper-canvas') as HTMLElement;
        canvas.style.width = `${this.imageSize}px`;
        canvas.style.height = `${this.imageSize}px`;

        this.cropperSelection?.$change(
          50,
          50,
          this.imageSize - 50,
          this.imageSize - 50,
          1
        );

        this.cropperSelection?.$center();
      });
  }

  cropImage() {
    this.cropperSelection
      ?.$toCanvas({ width: 800, height: 800 })
      .then((val: HTMLCanvasElement) => {
        val.toBlob((blob: Blob | null) => {
          if (blob) saveAs(blob, 'image.png');
        });
      });
  }

  zoomOut() {
    this.cropperImage?.$zoom(-0.05);
  }
  zoomIn() {
    this.cropperImage?.$zoom(0.05);
  }
}

const cropperTemplate = `
<cropper-canvas background style="width: 500px; height: 500px">
  <cropper-image
    #cropper
    [src]="_base64Image"
    initial-center-size="cover"
    alt="Picture"
    scalable
    translatable
  ></cropper-image>
  <cropper-shade hidden></cropper-shade>
  <cropper-handle action="move" plain></cropper-handle>
  <cropper-selection initial-coverage="0.9">
    <cropper-grid role="grid" covered></cropper-grid>
    <cropper-handle
      action="move"
      theme-color="rgba(255, 255, 255, 0.35)"
    ></cropper-handle>
  </cropper-selection>
</cropper-canvas>
`;
