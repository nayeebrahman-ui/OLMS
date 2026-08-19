import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-half-circle-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative flex flex-col items-center justify-end" [ngClass]="sizeClasses[size]">
      <svg class="w-full h-full overflow-visible" viewBox="0 0 100 50">
        <!-- Background Arch -->
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f3f4f6" [attr.stroke-width]="thickness" stroke-linecap="round" />
        <!-- Value Arch -->
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#D10074" [attr.stroke-width]="thickness" stroke-linecap="round"
              [attr.stroke-dasharray]="circumference"
              [attr.stroke-dashoffset]="dashOffset"
              class="transition-all duration-1000 ease-out" />
      </svg>
      <div class="absolute bottom-0 flex flex-col items-center justify-center mb-2">
        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">{{ label }}</span>
        <span class="font-bold text-gray-900" [ngClass]="textClasses[size]">{{ formattedValue }}</span>
      </div>
    </div>
  `
})
export class HalfCircleChartComponent {
  @Input() value: number = 75; // percentage 0-100
  @Input() label: string = 'PROJECT BALANCE';
  @Input() formattedValue: string = '$150,238';
  @Input() thickness: number = 8;
  @Input() size: 'md' | 'lg' | 'xl' = 'lg';

  circumference = Math.PI * 40; // Arch length
  get dashOffset() { return this.circumference - (this.value / 100) * this.circumference; }

  sizeClasses = { 'md': 'w-40 h-20', 'lg': 'w-64 h-32', 'xl': 'w-80 h-40' };
  textClasses = { 'md': 'text-lg', 'lg': 'text-2xl', 'xl': 'text-3xl' };
}
