import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption { label: string; value: string; icon?: string; }

@Component({
  selector: 'app-advanced-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full">
      <div 
        (click)="toggleOpen()"
        class="flex items-center justify-between w-full min-h-[40px] px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border-gray-400 focus-within:ring-1 focus-within:ring-brand-magenta focus-within:border-brand-magenta"
        [ngClass]="{'opacity-50 cursor-not-allowed': disabled, 'border-brand-magenta ring-1 ring-brand-magenta': isOpen}">
        
        <div class="flex flex-wrap gap-1 items-center flex-1">
          <span *ngIf="selectedOptions.length === 0" class="text-gray-500 text-sm">{{ placeholder }}</span>
          
          <ng-container *ngIf="displayMode === 'badge'">
            @for (opt of selectedOptions; track opt.value) {
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                {{ opt.label }}
                <button *ngIf="!disabled" (click)="removeOption($event, opt)" class="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">✕</button>
              </span>
            }
          </ng-container>

          <ng-container *ngIf="displayMode === 'text' && selectedOptions.length > 0">
            <span class="text-sm text-gray-900 truncate">
              {{ getSelectedText() }}
            </span>
          </ng-container>
        </div>
        
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
      </div>

      <!-- Dropdown Menu -->
      <div *ngIf="isOpen && !disabled" class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
        <ul class="py-1">
          @for (option of options; track option.value) {
            <li (click)="selectOption(option)" 
                class="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
                [ngClass]="{'bg-brand-magenta/5 text-brand-magenta': isSelected(option)}">
              <div class="flex items-center gap-2">
                <span *ngIf="option.icon" [innerHTML]="option.icon" class="text-gray-400"></span>
                <span>{{ option.label }}</span>
              </div>
              <svg *ngIf="isSelected(option)" class="w-4 h-4 text-brand-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </li>
          }
        </ul>
      </div>
    </div>
  `
})
export class AdvancedSelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Select...';
  @Input() displayMode: 'text' | 'badge' = 'badge';
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = true;
  @Output() selectionChange = new EventEmitter<SelectOption[]>();

  isOpen = false;
  selectedOptions: SelectOption[] = [];

  toggleOpen() { if (!this.disabled) this.isOpen = !this.isOpen; }
  
  isSelected(option: SelectOption): boolean {
    return this.selectedOptions.some(o => o.value === option.value);
  }

  selectOption(option: SelectOption) {
    if (this.multiple) {
      if (this.isSelected(option)) {
        this.selectedOptions = this.selectedOptions.filter(o => o.value !== option.value);
      } else {
        this.selectedOptions = [...this.selectedOptions, option];
      }
    } else {
      this.selectedOptions = [option];
      this.isOpen = false;
    }
    this.selectionChange.emit(this.selectedOptions);
  }

  removeOption(event: Event, option: SelectOption) {
    event.stopPropagation();
    this.selectedOptions = this.selectedOptions.filter(o => o.value !== option.value);
    this.selectionChange.emit(this.selectedOptions);
  }

  getSelectedText() { return this.selectedOptions.map(o => o.label).join(', '); }
}
