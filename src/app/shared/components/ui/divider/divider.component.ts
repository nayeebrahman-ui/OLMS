import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <hr [ngClass]="[
      'w-full border-t border-gray-200 my-4',
      variant === 'dashed' ? 'border-dashed' : 'border-solid',
      weightClasses[weight]
    ]" />
  `
})
export class DividerComponent {
  @Input() variant: 'solid' | 'dashed' = 'solid';
  @Input() weight: 'light' | 'normal' | 'heavy' = 'normal';

  weightClasses = {
    'light': 'border-[1px]',
    'normal': 'border-2',
    'heavy': 'border-4'
  };
}
