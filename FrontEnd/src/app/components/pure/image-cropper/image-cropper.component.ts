import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import 'cropperjs';
import Cropper, { CropperImage, CropperSelection } from 'cropperjs';

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

  @Output() imageCroppedEvent = new EventEmitter<string>();

  _base64Image!: string;

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

        document
          .querySelector('#image-cropper')
          ?.addEventListener('transform', this.handleTransform());
      });
  }

  /**
   * This function needs to be implemented on the parent
   * @returns
   */
  cropImage() {
    return this.cropperSelection?.$toCanvas({ width: 800, height: 800 });
  }

  zoomOut() {
    this.cropperImage?.$zoom(-0.05);
  }
  zoomIn() {
    this.cropperImage?.$zoom(0.05);
  }

  outputCrop() {
    const canvas = this.cropImage();
    canvas?.then((value) => {
      this.imageCroppedEvent.emit(value.toDataURL());
    });
  }

  handleTransform() {
    let time = 1000;
    let timeout: undefined | any; // NodeJS.Timeout
    return () => {
      const later = () => {
        timeout = undefined;
        this.outputCrop();
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, time);
      if (!timeout) this.outputCrop();
    };
  }
}

const cropperTemplate = `
<cropper-canvas background style="width: 500px; height: 500px">
  <cropper-image
    #cropper
    id="image-cropper"
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
