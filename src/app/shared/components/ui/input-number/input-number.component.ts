import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center bg-white border rounded-md transition-colors overflow-hidden"
         [ngClass]="[
           sizeClasses[size], 
           error ? 'border-brand-red ring-1 ring-brand-red' : 'border-gray-300 focus-within:ring-1 focus-within:ring-brand-magenta focus-within:border-brand-magenta',
           variant === 'filled' ? 'bg-gray-50 border-transparent focus-within:bg-white' : ''
         ]">
      
      <input type="number" 
             [value]="value" 
             (input)="onInput($event)"
             class="flex-1 w-full px-3 text-sm bg-transparent outline-none appearance-none text-gray-900"
             [disabled]="disabled" />

      <div class="flex items-center px-1 gap-1 border-l border-gray-200">
        <button type="button" (click)="increment()" [disabled]="disabled || value >= max"
                class="w-6 h-6 flex items-center justify-center rounded-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50">
          +
        </button>
        <button type="button" (click)="decrement()" [disabled]="disabled || value <= min"
                class="w-6 h-6 flex items-center justify-center rounded-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50">
          -
        </button>
      </div>
    </div>
    <p *ngIf="error" class="text-xs text-brand-red mt-1">{{ errorMessage }}</p>
  `,
  styles: [`
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  `]
})
export class InputNumberComponent {
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'outline' | 'filled' = 'outline';
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Input() errorMessage: string = 'Out of limit';
  
  @Output() valueChange = new EventEmitter<number>();

  sizeClasses = { 'sm': 'h-8', 'md': 'h-10', 'lg': 'h-12' };

  increment() {
    if (this.value < this.max) { this.value += this.step; this.emit(); }
  }
  decrement() {
    if (this.value > this.min) { this.value -= this.step; this.emit(); }
  }
  onInput(event: Event) {
    const val = parseFloat((event.target as HTMLInputElement).value);
    if (!isNaN(val)) { this.value = val; this.emit(); }
  }
  emit() { this.valueChange.emit(this.value); }
}
