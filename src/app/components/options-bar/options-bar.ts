import { Component, inject, input, output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-options-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './options-bar.html',
  styleUrl: './options-bar.scss',
  host: { class: 'options container', role: 'group', 'aria-label': 'Options' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsBar implements OnInit {
  // Inputs
  excludeSpaces = input<boolean>(false);
  limit = input<number | null>(null);
  readingTimeText = input<string>('0 minute');

  // Outputs
  excludeSpacesChange = output<boolean>();
  limitChange = output<number | null>();

  private readonly fb = inject(NonNullableFormBuilder);
  readonly form = this.fb.group({
    excludeSpaces: this.fb.control(false),
    limitEnabled: this.fb.control(false),
    limitValue: this.fb.control<number | null>(null, { validators: [Validators.min(1)] }),
  });

  ngOnInit(): void {
    
    this.form.patchValue(
      {
        excludeSpaces: this.excludeSpaces(),
        limitEnabled: this.limit() !== null,
        limitValue: this.limit(),
      },
      { emitEvent: false },
    );

    // emit changes
    this.form.controls.excludeSpaces.valueChanges.subscribe((v) =>
      this.excludeSpacesChange.emit(!!v),
    );

    this.form.valueChanges.subscribe((v) => {
      const next = v.limitEnabled
        ? typeof v.limitValue === 'number' && v.limitValue > 0
          ? v.limitValue
          : 1
        : null;
      this.limitChange.emit(next);
    });
  }

  get showLimit(): boolean {
    return this.form.controls.limitEnabled.value;
  }
  get limitInvalid(): boolean {
    const c = this.form.controls.limitValue;
    return this.form.controls.limitEnabled.value && !!c.errors;
  }
}
