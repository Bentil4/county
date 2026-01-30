import { Component, computed, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LetterStat } from '../../services/text-metrics';

@Component({
  selector: 'app-letter-density',
  imports: [DecimalPipe],
  templateUrl: './letter-density.html',
  styleUrl: './letter-density.scss',
})
export class LetterDensity {
  stats = input.required<LetterStat[]>();
  total = input<number>(0);

  expanded = signal(false);

  readonly visible = computed(() => {
    const all = this.stats();
    return this.expanded() ? all : all.slice(0, 6);
  });

  aria(item: LetterStat): string {
    const pct = Math.round(item.percent * 100);
    return `Letter ${item.letter} appears ${item.count} times which is ${pct} percent of all letters.`;
  }

  toggleExpanded(): void {
    this.expanded.update(v => !v);
  }
}
