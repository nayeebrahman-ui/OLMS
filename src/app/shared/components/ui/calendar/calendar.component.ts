import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 w-80 bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="flex justify-between items-center mb-4 text-sm font-semibold text-gray-800">
        <button class="p-1 hover:bg-gray-100 rounded">&lt;</button>
        <span>{{ currentMonth }} {{ currentYear }}</span>
        <button class="p-1 hover:bg-gray-100 rounded">&gt;</button>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center text-sm">
        @for (day of days; track day) {
          <div 
            class="p-2 rounded-full cursor-pointer hover:bg-gray-100"
            [ngClass]="{'bg-blue-600 text-white hover:bg-blue-700': day === selectedDate}">
            {{ day }}
          </div>
        }
      </div>
    </div>
  `
})
export class CalendarComponent {
  @Input() currentMonth: string = 'August';
  @Input() currentYear: number = 2026;
  @Input() selectedDate: number = 20;
  
  // Dummy array for days 1-31
  days = Array.from({length: 31}, (_, i) => i + 1);
}
