import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center gap-2">
      <svg class="animate-spin text-blue-600" [ngClass]="sizeClasses[size]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      @if (label) { <span class="text-xs text-gray-500">{{ label }}</span> }
    </div>
  `
})
export class SpinnerComponent {
  @Input() size: 'xs' | 'sm' | 'default' | 'lg' = 'default';
  @Input() label?: string;

  sizeClasses = {
    'xs': 'h-4 w-4', 'sm': 'h-6 w-6', 'default': 'h-8 w-8', 'lg': 'h-12 w-12'
  };
}
