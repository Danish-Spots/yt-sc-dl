import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { ImageComponent } from './image/image.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrl: './image-picker.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatRadioModule,
    ImageComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ImagePickerComponent {
  @Input() images!: string[] | null | undefined;

  showAddForm = false;
  imageUrlFormControl = new FormControl('');
  selectedImage = '';

  @Output() selectedImageChanged = new EventEmitter<string>();
  @Output() addImageEvent = new EventEmitter<string>();
  addNewImage() {
    this.showAddForm = true;
  }

  addImage() {
    if (!this.imageUrlFormControl.value) return;
    const imageUrl = this.imageUrlFormControl.value;
    this.imageUrlFormControl.reset('');
    this.showAddForm = false;
    this.addImageEvent.emit(imageUrl);
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.selectedImageChanged.emit(this.selectedImage);
  }
}
