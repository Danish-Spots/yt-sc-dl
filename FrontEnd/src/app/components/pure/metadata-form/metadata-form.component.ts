import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Metadata } from '../../../view-models/metadata';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-metadata-form',
  templateUrl: './metadata-form.component.html',
  styleUrl: './metadata-form.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class MetadataFormComponent implements OnDestroy {
  fb = inject(FormBuilder);

  metadataForm = this.fb.nonNullable.group({
    album: [''],
    title: [''],
    artist: [''],
  });

  destroy$ = new Subject<void>();

  @Input() set metadata(data: Omit<Metadata, 'image'> | null) {
    if (!data) return;
    this.metadataForm.patchValue(data);
  }

  @Output() formChanges = new EventEmitter<Omit<Metadata, 'image'>>();

  constructor() {
    this.metadataForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(1000))
      .subscribe((data) => {
        this.formChanges.emit(data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
