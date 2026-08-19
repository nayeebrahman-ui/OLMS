import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border border-gray-200 rounded-lg mb-2 overflow-hidden bg-white">
      <button 
        (click)="isOpen = !isOpen"
        class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
        <div class="flex items-center gap-2">
          <ng-content select="[icon]"></ng-content>
          <span class="font-medium text-gray-900">{{ title }}</span>
          <ng-content select="[badge]"></ng-content>
        </div>
        <span class="text-xl text-gray-500 font-light">{{ isOpen ? '-' : '+' }}</span>
      </button>
      <div *ngIf="isOpen" class="p-4 border-t border-gray-100 text-gray-600 bg-gray-50/50 text-sm">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AccordionItemComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
}
