import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      type="button"
      role="switch"
      [attr.aria-checked]="checked"
      [disabled]="disabled"
      (click)="toggle()"
      class="relative inline-flex items-center flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-magenta disabled:opacity-50 disabled:cursor-not-allowed"
      [ngClass]="checked ? 'bg-brand-magenta' : 'bg-gray-200'">
      
      <span class="sr-only">Toggle switch</span>
      
      <span 
        class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 flex items-center justify-center"
        [ngClass]="checked ? 'translate-x-5' : 'translate-x-0'">
        
        <!-- Optional Inner Icons -->
        <span *ngIf="showIcons" class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity" 
              [ngClass]="checked ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'">
          <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12"><path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span *ngIf="showIcons" class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity" 
              [ngClass]="checked ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'">
          <svg class="h-3 w-3 text-brand-magenta" fill="currentColor" viewBox="0 0 12 12"><path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/></svg>
        </span>
      </span>
    </button>
  `
})
export class SwitchComponent {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() showIcons: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
