import { Injectable, effect, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type AppTheme = 'light' | 'dark';
const THEME_KEY = 'cc:theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT) as Document;

  /** Source-of-truth theme signal */
  private readonly _theme = signal<AppTheme>(this.readInitial());

  
  readonly theme = this._theme.asReadonly();

  constructor() {
    // Reflect theme changes to the <html> element and persist
    effect(() => {
      const t = this._theme();
      this.document.documentElement.setAttribute('data-theme', t);
      try {
        localStorage.setItem(THEME_KEY, t);
      } catch {
        // Storage not available (e.g. private mode); ignore gracefully
      }
    });
  }

  /** Toggle between dark and light */
  toggle(): void {
    this._theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  /** Explicitly set the theme */
  set(theme: AppTheme): void {
    this._theme.set(theme);
  }

  /** Determine initial theme from storage or system preference */
  private readInitial(): AppTheme {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore storage errors
    }
    const prefersLight =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;

    return prefersLight ? 'light' : 'dark';
  }
}
