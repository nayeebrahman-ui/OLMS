import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-flex group cursor-pointer">
      <!-- Target Element -->
      <ng-content></ng-content>

      <!-- Tooltip Bubble -->
      <div 
        class="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pointer-events-none"
        [ngClass]="positionClasses[position]">
        <div class="bg-gray-900 text-white text-xs rounded shadow-lg flex flex-col whitespace-nowrap"
             [ngClass]="secondaryText ? 'p-3' : 'px-3 py-1.5'">
          
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ text }}</span>
            <span *ngIf="shortcut" class="flex gap-1">
              <kbd class="bg-gray-700 px-1 rounded text-[10px]">{{ shortcut }}</kbd>
            </span>
          </div>
          <span *ngIf="secondaryText" class="text-gray-400 mt-1">{{ secondaryText }}</span>
          
          <!-- Arrow -->
          <div class="absolute w-2 h-2 bg-gray-900 rotate-45" [ngClass]="arrowClasses[position]"></div>
        </div>
      </div>
    </div>
  `
})
export class TooltipComponent {
  @Input() text: string = 'Tooltip';
  @Input() secondaryText?: string;
  @Input() shortcut?: string;
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  positionClasses = {
    'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
    'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
    'right': 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  arrowClasses = {
    'top': '-bottom-1 left-1/2 -translate-x-1/2',
    'bottom': '-top-1 left-1/2 -translate-x-1/2',
    'left': '-right-1 top-1/2 -translate-y-1/2',
    'right': '-left-1 top-1/2 -translate-y-1/2'
  };
}
