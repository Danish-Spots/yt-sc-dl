import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-format-selector',
  templateUrl: './format-selector.component.html',
  styleUrl: './format-selector.component.scss',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule],
})
export class FormatSelectorComponent {
  @Input() set formats(f: string[]) {
    this._formats = f;
    if (f.length > 0) this.formatChange(f[0]);
  }
  @Output() formatChanged = new EventEmitter<string>();

  _formats!: string[];
  selectedFormat!: string;

  formatChange(event: string) {
    this.selectedFormat = event;
    this.formatChanged.emit(this.selectedFormat);
  }
}
