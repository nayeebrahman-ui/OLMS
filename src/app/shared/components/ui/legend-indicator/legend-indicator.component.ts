import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legend-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 text-sm text-gray-600">
      <span class="w-2.5 h-2.5 rounded-full" [ngStyle]="{'background-color': color}"></span>
      <span>{{ label }}</span>
    </div>
  `
})
export class LegendIndicatorComponent {
  @Input() color: string = '#3DB7E4'; // Default brand Cyan
  @Input() label: string = 'Legend Item';
}
