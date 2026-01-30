import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /** Current theme from the parent */
  theme = input<'light' | 'dark'>('dark');

  /** Emit when the user toggles the theme */
  themeToggled = output<void>();

  /** Derived state used by the template */
  readonly isLight = computed(() => this.theme() === 'light');
  readonly switchLabel = computed(() =>
    this.isLight() ? 'Switch to dark theme' : 'Switch to light theme',
  );
}
