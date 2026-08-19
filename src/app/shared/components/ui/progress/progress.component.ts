import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <div class="flex justify-between items-end mb-1 text-xs">
        @if (label) { <span class="font-medium text-gray-700">{{ label }}</span> }
        @if (showValue) { <span class="text-blue-600 font-semibold">{{ value }}%</span> }
      </div>
      <div class="w-full bg-blue-100 rounded-full h-2">
        <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" [style.width.%]="value"></div>
      </div>
    </div>
  `
})
export class ProgressComponent {
  @Input() value: number = 0;
  @Input() label?: string;
  @Input() showValue: boolean = true;
}
