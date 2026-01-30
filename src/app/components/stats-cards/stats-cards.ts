import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  imports: [DecimalPipe],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCards {
  chars = input<number>(0);
  words = input<number>(0);
  sentences = input<number>(0);
  excludeSpaces = input<boolean>(false);
}
