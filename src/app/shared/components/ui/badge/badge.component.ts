import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="[
      'inline-flex items-center gap-1.5 font-medium rounded-md',
      sizeClasses[size],
      colorClasses[color]
    ]">
      <ng-content select="[icon]"></ng-content>
      {{ label }}
      <button *ngIf="dismissible" class="ml-1 hover:opacity-75">✕</button>
    </span>
  `
})
export class BadgeComponent {
  @Input() label: string = 'Badge';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'magenta' | 'blue' | 'yellow' | 'red' | 'green' | 'gray' = 'magenta';
  @Input() dismissible: boolean = true;

  sizeClasses = { 'sm': 'px-2 py-0.5 text-xs', 'md': 'px-2.5 py-1 text-sm', 'lg': 'px-3 py-1.5 text-base' };
  colorClasses = {
    'magenta': 'bg-brand-magenta/10 text-brand-magenta border border-brand-magenta/20',
    'blue': 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20',
    'yellow': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    'red': 'bg-brand-red/10 text-brand-red border border-brand-red/20',
    'green': 'bg-green-100 text-green-700 border border-green-200',
    'gray': 'bg-gray-100 text-gray-700 border border-gray-200',
  };
}
