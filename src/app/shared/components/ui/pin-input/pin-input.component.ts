import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pin-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-3">
      @for (digit of digits; track $index) {
        <input 
          #pinInput
          type="text" 
          maxlength="1" 
          [disabled]="disabled"
          (input)="onInput($event, $index)"
          (keydown)="onKeyDown($event, $index)"
          class="w-12 h-14 text-center text-xl font-bold bg-white border rounded-lg shadow-sm outline-none transition-all focus:ring-2 focus:ring-brand-magenta focus:border-brand-magenta disabled:bg-gray-50 disabled:opacity-50"
          [ngClass]="error ? 'border-brand-red text-brand-red focus:ring-brand-red' : 'border-gray-300 text-gray-900'" />
      }
    </div>
  `
})
export class PinInputComponent {
  @Input() length: number = 4;
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Output() completed = new EventEmitter<string>();

  @ViewChildren('pinInput') inputs!: QueryList<ElementRef>;
  digits: string[] = [];

  ngOnInit() { this.digits = Array(this.length).fill(''); }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    this.digits[index] = input.value;
    
    if (input.value && index < this.length - 1) {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
    this.checkCompletion();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  checkCompletion() {
    const pin = this.digits.join('');
    if (pin.length === this.length) this.completed.emit(pin);
  }
}
