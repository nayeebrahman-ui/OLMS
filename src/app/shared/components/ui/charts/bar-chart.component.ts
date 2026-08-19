import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BarData { label: string; value1: number; value2?: number; }

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full h-64 flex flex-col relative">
      <!-- Grid Lines -->
      <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
        <div *ngFor="let _ of [1,2,3,4,5]" class="w-full border-t border-gray-100"></div>
      </div>
      
      <!-- Bars -->
      <div class="flex-1 flex items-end justify-between px-4 z-10 gap-2">
        <div *ngFor="let item of data" class="flex-1 flex justify-center gap-1 group relative h-full items-end">
          
          <!-- Tooltip (Shows on hover) -->
          <div class="absolute -top-12 bg-gray-900 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap">
            <p class="font-bold mb-1">{{ item.label }} 2026</p>
            <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-brand-magenta"></span> {{ item.value1 }}k</div>
            <div *ngIf="item.value2" class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gray-300"></span> {{ item.value2 }}k</div>
          </div>

          <!-- Primary Bar (Brand Color) -->
          <div class="w-full max-w-[12px] bg-brand-magenta rounded-t-sm transition-all duration-500 hover:bg-brand-magenta/80 cursor-pointer"
               [style.height.%]="(item.value1 / maxValue) * 100"></div>
          
          <!-- Secondary Bar -->
          <div *ngIf="item.value2" class="w-full max-w-[12px] bg-gray-200 rounded-t-sm transition-all duration-500 hover:bg-gray-300 cursor-pointer"
               [style.height.%]="(item.value2 / maxValue) * 100"></div>
        </div>
      </div>

      <!-- X-Axis Labels -->
      <div class="flex justify-between px-4 mt-2 border-t border-gray-200 pt-2 text-xs text-gray-500">
        <span *ngFor="let item of data" class="flex-1 text-center truncate">{{ item.label }}</span>
      </div>
    </div>
  `
})
export class BarChartComponent {
  @Input() data: BarData[] = [];
  @Input() maxValue: number = 400;
}
