import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'org-details',
  templateUrl: './details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DetailsComponent {
  @Input() icon?: string;
  @Input() amount?: string;
  @Input() name?: string;
}
