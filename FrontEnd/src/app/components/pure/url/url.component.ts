import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrl: './url.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class UrlComponent {
  @Input({ required: true }) set allowedUrlsRegex(allowedUrlsRegex: RegExp) {
    this.urlControl.addValidators(this.verifyUrl(allowedUrlsRegex));
  }

  @Output() emitUrl = new EventEmitter<string>();

  urlControl = new FormControl('', []);

  fetchDataClicked(): void {
    if (this.urlControl.invalid) return;

    this.emitUrl.emit(this.urlControl.value ?? undefined);
  }

  private verifyUrl(
    allowedUrlsRegex: RegExp
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!allowedUrlsRegex)
        return {
          InvalidUrl: 'Regex not passed correctly',
        };
      const match = control.value.match(allowedUrlsRegex);
      return match && match[1]
        ? null
        : {
            InvalidUrl: 'Invalid url error',
          };
    };
  }
}
