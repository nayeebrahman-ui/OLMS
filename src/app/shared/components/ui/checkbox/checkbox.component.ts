import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="flex items-start gap-3 cursor-pointer group" [class.opacity-50]="disabled" [class.cursor-not-allowed]="disabled">
      <div class="relative flex items-center justify-center w-5 h-5 mt-0.5">
        <input 
          type="checkbox" 
          class="peer sr-only"
          [checked]="checked"
          [disabled]="disabled"
          (change)="onChange($event)" />
        <div class="w-5 h-5 border-2 border-gray-300 rounded transition-colors"
             [ngClass]="{'bg-brand-magenta border-brand-magenta': checked || indeterminate, 'group-hover:border-brand-magenta': !disabled}">
        </div>
        <!-- Check Icon -->
        <svg *ngIf="checked && !indeterminate" class="absolute w-3.5 h-3.5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
        <!-- Indeterminate Icon -->
        <div *ngIf="indeterminate" class="absolute w-2.5 h-0.5 bg-white pointer-events-none rounded-full"></div>
      </div>
      <div>
        <span class="text-sm font-medium text-gray-900">{{ label }}</span>
        <p *ngIf="description" class="text-xs text-gray-500 mt-0.5">{{ description }}</p>
      </div>
    </label>
  `
})
export class CheckboxComponent {
  @Input() label: string = 'Checkbox label';
  @Input() description?: string;
  @Input() checked: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() disabled: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    if (this.disabled) return;
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked = isChecked;
    this.indeterminate = false;
    this.checkedChange.emit(isChecked);
  }
}
