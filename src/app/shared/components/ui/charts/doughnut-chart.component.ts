import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-flex items-center justify-center" [ngClass]="sizeClasses[size]">
      <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <!-- Background Track -->
        <circle cx="50" cy="50" [attr.r]="radius" fill="transparent" stroke="#f3f4f6" [attr.stroke-width]="thickness" />
        <!-- Progress Segment -->
        <circle 
          cx="50" cy="50" 
          [attr.r]="radius" 
          fill="transparent" 
          stroke="#D10074" 
          [attr.stroke-width]="thickness"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashOffset"
          class="transition-all duration-1000 ease-out" />
      </svg>
      <!-- Center Content -->
      <div *ngIf="showLabel" class="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span class="font-bold text-gray-900" [ngClass]="textClasses[size]">{{ value }}%</span>
        <span *ngIf="subtitle" class="text-[10px] text-gray-500 max-w-[80%] leading-tight">{{ subtitle }}</span>
      </div>
    </div>
  `
})
export class DoughnutChartComponent {
  @Input() value: number = 65;
  @Input() thickness: number = 10;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showLabel: boolean = true;
  @Input() subtitle?: string;

  radius = 50 - this.thickness;
  circumference = 2 * Math.PI * this.radius;
  
  get dashOffset() { return this.circumference - (this.value / 100) * this.circumference; }

  sizeClasses = { 'sm': 'w-12 h-12', 'md': 'w-24 h-24', 'lg': 'w-32 h-32', 'xl': 'w-48 h-48' };
  textClasses = { 'sm': 'text-xs', 'md': 'text-xl', 'lg': 'text-2xl', 'xl': 'text-4xl' };
  
  ngOnChanges() {
    this.radius = 50 - (this.thickness / 2);
    this.circumference = 2 * Math.PI * this.radius;
  }
}
