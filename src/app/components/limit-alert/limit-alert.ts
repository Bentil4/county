import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-limit-alert',
  imports: [],
  templateUrl: './limit-alert.html',
  styleUrl: './limit-alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitAlert {
  visible = input<boolean>(false);
  limit = input<number>(0);
}
