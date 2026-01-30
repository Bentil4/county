import {
  Component,
  input,
  output,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.scss',
})
export class TextEditor implements OnInit, OnChanges {
  // Inputs
  value = input<string>('');
  limit = input<number | null>(null);
  overLimit = input<boolean>(false);
  helperText = input<string>('');

  // Outputs
  valueChange = output<string>();

  // Local state
  readonly control = new FormControl<string>('', { nonNullable: true });
  readonly focused = signal(false);

  private readonly fb = inject(NonNullableFormBuilder);
  ngOnInit(): void {
    this.control.setValue(this.value(), { emitEvent: false });
    this.control.valueChanges.subscribe((v) => this.valueChange.emit(v));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value() !== this.control.value) {
      this.control.setValue(this.value(), { emitEvent: false });
    }
  }
}
